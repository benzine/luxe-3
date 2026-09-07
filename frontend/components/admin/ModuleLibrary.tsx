'use client';

import React from 'react';
import { useBuilderStore } from '@/hooks/useBuilderStore';
import { Section } from '@/types';

const moduleTypes = [
  { type: 'text', label: 'Text', icon: '📝', category: 'Basic' },
  { type: 'heading', label: 'Heading', icon: 'H', category: 'Basic' },
  { type: 'button', label: 'Button', icon: '🔘', category: 'Basic' },
  { type: 'image', label: 'Image', icon: '🖼️', category: 'Media' },
  { type: 'video', label: 'Video', icon: '🎬', category: 'Media' },
  { type: 'icon', label: 'Icon', icon: '⭐', category: 'Basic' },
  { type: 'divider', label: 'Divider', icon: '➖', category: 'Basic' },
  { type: 'spacer', label: 'Spacer', icon: '↕️', category: 'Basic' },
  { type: 'form', label: 'Form', icon: '📋', category: 'Interactive' },
  { type: 'testimonials', label: 'Testimonials', icon: '💬', category: 'Dynamic' },
  { type: 'team', label: 'Team Members', icon: '👥', category: 'Dynamic' },
  { type: 'pricing', label: 'Pricing Tables', icon: '💰', category: 'Interactive' },
  { type: 'blog', label: 'Blog Posts', icon: '📰', category: 'Dynamic' },
  { type: 'accordion', label: 'Accordion/Tabs', icon: '🗂️', category: 'Interactive' },
  { type: 'features', label: 'Feature Boxes', icon: '✨', category: 'Basic' },
  { type: 'stats', label: 'Counters/Stats', icon: '📊', category: 'Interactive' },
  { type: 'progress', label: 'Progress Bars', icon: '📈', category: 'Interactive' },
  { type: 'timeline', label: 'Timeline', icon: '📅', category: 'Basic' },
  { type: 'logos', label: 'Logo Carousel', icon: '🏢', category: 'Dynamic' },
  { type: 'instagram', label: 'Instagram Feed', icon: '📷', category: 'Dynamic' },
  { type: 'search', label: 'Search', icon: '🔍', category: 'Interactive' },
  { type: 'breadcrumbs', label: 'Breadcrumbs', icon: '🍞', category: 'Basic' },
  { type: 'html', label: 'Custom HTML', icon: '</>', category: 'Advanced' },
];

export default function ModuleLibrary() {
  const { selectedSectionId, addSection } = useBuilderStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const categories = ['All', ...new Set(moduleTypes.map(m => m.category))];

  const filteredModules = moduleTypes.filter(module => {
    const matchesSearch = module.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || module.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddSection = (moduleType: string) => {
    if (!selectedSectionId) {
      // Add as new section
      const newSection: Section = {
        id: `section-${Date.now()}`,
        adminLabel: moduleType.charAt(0).toUpperCase() + moduleType.slice(1),
        moduleType,
        isVisible: true,
        deviceVisibility: 'all',
        order: 0,
        settings: {
          layout: {
            width: 'contained',
            height: 'auto',
            columns: 1,
            verticalAlign: 'center',
            horizontalAlign: 'center',
          },
          background: {
            type: 'color',
            color: '#ffffff',
          },
          border: {
            width: '0',
            style: 'none',
            color: '#000000',
            radius: {
              topLeft: '0',
              topRight: '0',
              bottomLeft: '0',
              bottomRight: '0',
            },
          },
          shadow: {
            x: 0,
            y: 0,
            blur: 0,
            spread: 0,
            color: '#000000',
            opacity: 0,
            inset: false,
          },
          spacing: {
            padding: {
              top: '4rem',
              right: '0',
              bottom: '4rem',
              left: '0',
            },
            margin: {
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            },
          },
        },
        content: {},
      };
      addSection(newSection);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
        Module Library
      </h3>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1 mb-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
        {filteredModules.map((module) => (
          <button
            key={module.type}
            onClick={() => handleAddSection(module.type)}
            className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <span className="text-2xl mb-1">{module.icon}</span>
            <span className="text-xs font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {module.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
