'use client';

import React from 'react';
import { useBuilderStore } from '@/hooks/useBuilderStore';
import { Section } from '@/types';

interface CenterStageProps {
  showFullPage: boolean;
}

export default function CenterStage({ showFullPage }: CenterStageProps) {
  const { sections, selectedSectionId, deviceSize, siteSettings } = useBuilderStore();

  // Get the section to display
  const displayedSections = showFullPage 
    ? sections 
    : sections.filter(s => s.id === selectedSectionId);

  // Device width mapping
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const currentWidth = deviceWidths[deviceSize];

  return (
    <div className="p-8 min-h-full">
      <div 
        className="mx-auto transition-all duration-300"
        style={{ 
          maxWidth: currentWidth,
          width: currentWidth === '100%' ? '100%' : currentWidth,
        }}
      >
        {displayedSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start Building Your Page
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Select a section from the left panel or add a new module from the library to begin editing.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {displayedSections.map((section) => (
              <SectionRenderer 
                key={section.id} 
                section={section} 
                isSelected={!showFullPage && section.id === selectedSectionId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionRenderer({ section, isSelected }: { section: Section; isSelected: boolean }) {
  const { setSelectedElement } = useBuilderStore();
  
  if (!section.isVisible) return null;

  const { settings, content } = section;
  
  // Apply section styles
  const sectionStyle: React.CSSProperties = {
    backgroundColor: settings.background.type === 'color' ? settings.background.color : undefined,
    backgroundImage: settings.background.type === 'gradient' ? settings.background.gradient : undefined,
    paddingTop: settings.spacing.padding.top,
    paddingRight: settings.spacing.padding.right,
    paddingBottom: settings.spacing.padding.bottom,
    paddingLeft: settings.spacing.padding.left,
    marginTop: settings.spacing.margin.top,
    marginRight: settings.spacing.margin.right,
    marginBottom: settings.spacing.margin.bottom,
    marginLeft: settings.spacing.margin.left,
    borderTopWidth: settings.border.width,
    borderRightWidth: settings.border.width,
    borderBottomWidth: settings.border.width,
    borderLeftWidth: settings.border.width,
    borderTopStyle: settings.border.style,
    borderRightStyle: settings.border.style,
    borderBottomStyle: settings.border.style,
    borderLeftStyle: settings.border.style,
    borderTopColor: settings.border.color,
    borderRightColor: settings.border.color,
    borderBottomColor: settings.border.color,
    borderLeftColor: settings.border.color,
    borderTopLeftRadius: settings.border.radius.topLeft,
    borderTopRightRadius: settings.border.radius.topRight,
    borderBottomLeftRadius: settings.border.radius.bottomLeft,
    borderBottomRightRadius: settings.border.radius.bottomRight,
    boxShadow: settings.shadow.opacity > 0 
      ? `${settings.shadow.inset ? 'inset ' : ''}${settings.shadow.x}px ${settings.shadow.y}px ${settings.shadow.blur}px ${settings.shadow.spread}px ${settings.shadow.color}${Math.round(settings.shadow.opacity * 255).toString(16).padStart(2, '0')}`
      : undefined,
  };

  return (
    <section
      id={section.settings.customId}
      className={`relative group ${section.settings.customClasses || ''} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
      style={sectionStyle}
      onClick={() => setSelectedElement(null)}
    >
      {/* Hover outline when not selected */}
      {!isSelected && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          <div className="absolute inset-0 ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-gray-900 rounded-lg" />
        </div>
      )}

      {/* Section Content based on module type */}
      <div className="relative">
        {section.moduleType === 'heading' && (
          <HeadingModule content={content} />
        )}
        {section.moduleType === 'text' && (
          <TextModule content={content} />
        )}
        {section.moduleType === 'button' && (
          <ButtonModule content={content} />
        )}
        {section.moduleType === 'image' && (
          <ImageModule content={content} />
        )}
        {section.moduleType === 'stats' && (
          <StatsModule content={content} />
        )}
        {section.moduleType === 'testimonials' && (
          <TestimonialsModule content={content} />
        )}
        {section.moduleType === 'features' && (
          <FeaturesModule content={content} />
        )}
        {/* Add more module renderers as needed */}
        
        {/* Empty state for unimplemented modules */}
        {!['heading', 'text', 'button', 'image', 'stats', 'testimonials', 'features'].includes(section.moduleType) && (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {section.moduleType} module - Content editable via inspector
            </p>
          </div>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-md font-medium">
          Editing
        </div>
      )}
    </section>
  );
}

// Module Components with inline editing capability

function HeadingModule({ content }: { content: Record<string, unknown> }) {
  const heading = String(content.heading || 'Your Headline Here');
  const subHeading = content.subHeading ? String(content.subHeading) : null;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {heading}
      </h1>
      {subHeading && (
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {subHeading}
        </p>
      )}
    </div>
  );
}

function TextModule({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="prose prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: String(content.text || '<p>Your text content here...</p>') }}
      />
    </div>
  );
}

function ButtonModule({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="flex justify-center">
      <a
        href={String(content.buttonLink || '#')}
        target={content.buttonTarget === '_blank' ? '_blank' : undefined}
        rel={content.buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        {String(content.buttonText || 'Click Here')}
      </a>
    </div>
  );
}

function ImageModule({ content }: { content: Record<string, unknown> }) {
  const imageUrl = content.imageUrl as string || '/images/placeholder.jpg';
  
  return (
    <div className="flex justify-center">
      <img
        src={imageUrl}
        alt={String(content.imageAlt || 'Image')}
        className="max-w-full h-auto rounded-lg shadow-lg"
        style={{
          width: content.imageWidth as string || 'auto',
          height: content.imageHeight as string || 'auto',
        }}
      />
    </div>
  );
}

function StatsModule({ content }: { content: Record<string, unknown> }) {
  const stats = content.stats as Array<{ number: string; label: string; prefix?: string; suffix?: string }> || [];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.length > 0 ? (
          stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.prefix}{stat.number}{stat.suffix}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))
        ) : (
          // Default placeholder stats
          <>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TestimonialsModule({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
            "Working with this team was an absolute pleasure. They delivered beyond our expectations."
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">CEO, Company Inc.</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
            "The results speak for themselves. Highly recommended!"
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Jane Smith</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesModule({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Features</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Feature {i}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Describe your amazing feature here with compelling copy.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
