'use client';

import React, { useState } from 'react';
import { useBuilderStore } from '@/hooks/useBuilderStore';
import LeftDock from './LeftDock';
import RightInspector from './RightInspector';
import CenterStage from './CenterStage';
import SectionList from './SectionList';
import ModuleLibrary from './ModuleLibrary';
import Toolbar from './Toolbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const { 
    isIsolatedMode, 
    selectedSectionId, 
    sections,
    leftDockOpen,
    rightInspectorOpen,
    darkMode,
    undo,
    redo,
    historyIndex,
    history
  } = useBuilderStore();
  
  const [showFullPage, setShowFullPage] = useState(!isIsolatedMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Left Dock */}
        <AnimatePresence>
          {leftDockOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20"
            >
              <LeftDock />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => useBuilderStore.getState().toggleLeftDock()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isIsolatedMode ? 'Editing Section' : 'Page Builder'}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Undo
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Redo
              </button>
              <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Draft
              </button>
              <button className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                Publish
              </button>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Rail - Section List & Module Library */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              <SectionList />
              <ModuleLibrary />
            </div>

            {/* Center Stage */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {isIsolatedMode && selectedSectionId && (
                <Toolbar 
                  sectionId={selectedSectionId}
                  onBackToFullPage={() => {
                    useBuilderStore.getState().toggleIsolatedMode(false);
                    setShowFullPage(true);
                  }}
                />
              )}
              <CenterStage showFullPage={showFullPage && !isIsolatedMode} />
            </main>

            {/* Right Inspector */}
            <AnimatePresence>
              {rightInspectorOpen && (
                <motion.aside
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  exit={{ x: 400 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
                >
                  <RightInspector />
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
