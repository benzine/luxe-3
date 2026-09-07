'use client';

import React from 'react';
import { useBuilderStore } from '@/hooks/useBuilderStore';
import { Section, SectionSettings } from '@/types';

export default function RightInspector() {
  const { sections, selectedSectionId, selectedElementId, updateSection } = useBuilderStore();
  
  const section = sections.find(s => s.id === selectedSectionId);

  if (!section) {
    return (
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          Inspector
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a section or element to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
          {selectedElementId ? 'Element Properties' : 'Section Settings'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {section.moduleType} - {section.adminLabel}
        </p>
      </div>

      {/* Layout Settings */}
      <LayoutSettings section={section} />

      {/* Background Settings */}
      <BackgroundSettings section={section} />

      {/* Spacing Settings */}
      <SpacingSettings section={section} />

      {/* Border & Shadow */}
      <BorderShadowSettings section={section} />

      {/* Animation Settings */}
      <AnimationSettings section={section} />

      {/* Advanced Settings */}
      <AdvancedSettings section={section} />
    </div>
  );
}

function LayoutSettings({ section }: { section: Section }) {
  const { updateSection } = useBuilderStore();
  const { layout } = section.settings;

  return (
    <div className="p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Layout</h4>
      
      <div className="space-y-3">
        {/* Width */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Width</label>
          <select
            value={layout.width}
            onChange={(e) => updateSection(section.id, {
              settings: { ...section.settings, layout: { ...layout, width: e.target.value as 'full' | 'contained' } }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
          >
            <option value="contained">Contained</option>
            <option value="full">Full Width</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Height</label>
          <select
            value={layout.height}
            onChange={(e) => updateSection(section.id, {
              settings: { ...section.settings, layout: { ...layout, height: e.target.value as 'auto' | 'custom' | 'viewport' } }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
          >
            <option value="auto">Auto</option>
            <option value="custom">Custom</option>
            <option value="viewport">Full Viewport</option>
          </select>
        </div>

        {/* Vertical Alignment */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Vertical Align</label>
          <div className="flex gap-1">
            {(['top', 'center', 'bottom', 'space-between'] as const).map((align) => (
              <button
                key={align}
                onClick={() => updateSection(section.id, {
                  settings: { ...section.settings, layout: { ...layout, verticalAlign: align } }
                })}
                className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
                  layout.verticalAlign === align
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {align.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundSettings({ section }: { section: Section }) {
  const { updateSection } = useBuilderStore();
  const { background } = section.settings;

  return (
    <div className="p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Background</h4>
      
      <div className="space-y-3">
        {/* Type */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Type</label>
          <select
            value={background.type}
            onChange={(e) => updateSection(section.id, {
              settings: { ...section.settings, background: { ...background, type: e.target.value as 'color' | 'gradient' | 'image' | 'video' } }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
          >
            <option value="color">Solid Color</option>
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Color Picker */}
        {background.type === 'color' && (
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={background.color || '#ffffff'}
                onChange={(e) => updateSection(section.id, {
                  settings: { ...section.settings, background: { ...background, color: e.target.value } }
                })}
                className="w-8 h-8 rounded cursor-pointer"
              />
              <input
                type="text"
                value={background.color || '#ffffff'}
                onChange={(e) => updateSection(section.id, {
                  settings: { ...section.settings, background: { ...background, color: e.target.value } }
                })}
                className="flex-1 px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Image Upload */}
        {background.type === 'image' && (
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Background Image</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
              <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Drag and drop or click to upload
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Images stored in /images/ folder
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SpacingSettings({ section }: { section: Section }) {
  const { updateSection } = useBuilderStore();
  const { spacing } = section.settings;

  return (
    <div className="p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Spacing</h4>
      
      <div className="space-y-4">
        {/* Padding */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Padding</label>
          <div className="grid grid-cols-2 gap-2">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <div key={side}>
                <label className="block text-xs text-gray-400 dark:text-gray-500 capitalize mb-1">
                  {side}
                </label>
                <input
                  type="text"
                  value={spacing.padding[side]}
                  onChange={(e) => updateSection(section.id, {
                    settings: { 
                      ...section.settings, 
                      spacing: { 
                        ...spacing, 
                        padding: { ...spacing.padding, [side]: e.target.value } 
                      } 
                    }
                  })}
                  className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Margin */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Margin</label>
          <div className="grid grid-cols-2 gap-2">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <div key={side}>
                <label className="block text-xs text-gray-400 dark:text-gray-500 capitalize mb-1">
                  {side}
                </label>
                <input
                  type="text"
                  value={spacing.margin[side]}
                  onChange={(e) => updateSection(section.id, {
                    settings: { 
                      ...section.settings, 
                      spacing: { 
                        ...spacing, 
                        margin: { ...spacing.margin, [side]: e.target.value } 
                      } 
                    }
                  })}
                  className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BorderShadowSettings({ section }: { section: Section }) {
  const { updateSection } = useBuilderStore();
  const { border, shadow } = section.settings;

  return (
    <div className="p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Border & Shadow</h4>
      
      <div className="space-y-4">
        {/* Border Radius */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Border Radius</label>
          <input
            type="text"
            value={border.radius.topLeft}
            onChange={(e) => updateSection(section.id, {
              settings: { 
                ...section.settings, 
                border: { 
                  ...border, 
                  radius: { 
                    ...border.radius, 
                    topLeft: e.target.value,
                    topRight: e.target.value,
                    bottomLeft: e.target.value,
                    bottomRight: e.target.value,
                  } 
                } 
              }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
            placeholder="0"
          />
        </div>

        {/* Box Shadow Opacity */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            Shadow Opacity: {Math.round(shadow.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={shadow.opacity * 100}
            onChange={(e) => updateSection(section.id, {
              settings: { 
                ...section.settings, 
                shadow: { ...shadow, opacity: parseInt(e.target.value) / 100 } 
              }
            })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function AnimationSettings({ section }: { section: Section }) {
  const { updateSection } = useBuilderStore();
  const { animation } = section.settings;

  if (!animation) return null;

  return (
    <div className="p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Animation</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Entrance Animation</label>
          <select
            value={animation.entrance}
            onChange={(e) => updateSection(section.id, {
              settings: { 
                ...section.settings, 
                animation: { ...animation, entrance: e.target.value as any } 
              }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
          >
            <option value="none">None</option>
            <option value="fade">Fade In</option>
            <option value="slide">Slide In</option>
            <option value="zoom">Zoom In</option>
            <option value="flip">Flip</option>
            <option value="bounce">Bounce</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Duration (ms)</label>
          <input
            type="number"
            value={animation.duration}
            onChange={(e) => updateSection(section.id, {
              settings: { 
                ...section.settings, 
                animation: { ...animation, duration: parseInt(e.target.value) } 
              }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}

function AdvancedSettings({ section }: { section: Section }) {
  const { updateSection } = useBuilderStore();

  return (
    <div className="p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Advanced</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Custom ID</label>
          <input
            type="text"
            value={section.settings.customId || ''}
            onChange={(e) => updateSection(section.id, {
              settings: { ...section.settings, customId: e.target.value }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
            placeholder="section-id"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Custom Classes</label>
          <input
            type="text"
            value={section.settings.customClasses || ''}
            onChange={(e) => updateSection(section.id, {
              settings: { ...section.settings, customClasses: e.target.value }
            })}
            className="w-full px-2 py-1.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-sm text-gray-900 dark:text-white"
            placeholder="class-1 class-2"
          />
        </div>
      </div>
    </div>
  );
}
