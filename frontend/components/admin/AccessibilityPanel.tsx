'use client';

import React from 'react';
import { useBuilderStore } from '@/hooks/useBuilderStore';

export function AccessibilityPanel() {
  const { fontSize, setFontSize, highContrast, toggleHighContrast, reducedMotion, toggleReducedMotion } = useBuilderStore();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Accessibility
      </h3>
      
      {/* Font Size */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
          Font Size
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setFontSize('normal')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
              fontSize === 'normal'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
              fontSize === 'large'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            A+
          </button>
          <button
            onClick={() => setFontSize('larger')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors ${
              fontSize === 'larger'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            A++
          </button>
        </div>
      </div>

      {/* High Contrast */}
      <div className="mb-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            High Contrast
          </span>
          <button
            onClick={toggleHighContrast}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                highContrast ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Reduced Motion */}
      <div>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Reduced Motion
          </span>
          <button
            onClick={toggleReducedMotion}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              reducedMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  );
}
