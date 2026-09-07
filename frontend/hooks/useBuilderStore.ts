import { create } from 'zustand';
import { Section, PageData, SiteSettings, HeaderSettings, FooterSettings, DeviceSize } from '@/types';

interface BuilderState {
  // Page state
  currentPage: PageData | null;
  setCurrentPage: (page: PageData) => void;
  
  // Section state
  sections: Section[];
  selectedSectionId: string | null;
  isIsolatedMode: boolean;
  
  // Section operations
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  duplicateSection: (id: string) => void;
  selectSection: (id: string | null) => void;
  toggleIsolatedMode: (enabled: boolean) => void;
  
  // Element state
  selectedElementId: string | null;
  setSelectedElement: (id: string | null) => void;
  
  // Device preview
  deviceSize: DeviceSize;
  setDeviceSize: (size: DeviceSize) => void;
  
  // Global settings
  siteSettings: SiteSettings | null;
  headerSettings: HeaderSettings | null;
  footerSettings: FooterSettings | null;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  // UI state
  leftDockOpen: boolean;
  rightInspectorOpen: boolean;
  toggleLeftDock: () => void;
  toggleRightInspector: () => void;
  
  // Undo/Redo
  history: Section[][];
  historyIndex: number;
  addToHistory: (sections: Section[]) => void;
  undo: () => void;
  redo: () => void;
  
  // Dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Accessibility
  fontSize: 'normal' | 'large' | 'larger';
  highContrast: boolean;
  reducedMotion: boolean;
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  
  // Language
  currentLanguage: 'en' | 'fr' | 'es' | 'de';
  setLanguage: (lang: 'en' | 'fr' | 'es' | 'de') => void;
}

const defaultSiteSettings: SiteSettings = {
  siteTitle: 'My Website',
  siteTagline: 'Welcome to our site',
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  primaryColor: '#3B82F6',
  secondaryColor: '#10B981',
  accentColor: '#F59E0B',
  typography: {
    fontFamilyBase: 'Inter, system-ui, sans-serif',
    fontFamilyHeadings: 'Inter, system-ui, sans-serif',
    fontSizes: {
      h1: '3rem',
      h2: '2.25rem',
      h3: '1.875rem',
      h4: '1.5rem',
      h5: '1.25rem',
      h6: '1rem',
      body: '1rem',
      small: '0.875rem',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      base: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    padding: {
      section: '4rem',
      container: '1.5rem',
    },
    gaps: {
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
    },
  },
  borders: {
    defaultRadius: '0.375rem',
    borderWidths: {
      sm: '1px',
      md: '2px',
      lg: '4px',
    },
  },
  shadows: {
    presets: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  container: {
    maxWidth: '1280px',
    sidePadding: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
  },
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  // Page state
  currentPage: null,
  setCurrentPage: (page) => set({ currentPage: page, sections: page.sections }),
  
  // Section state
  sections: [],
  selectedSectionId: null,
  isIsolatedMode: false,
  
  // Section operations
  addSection: (section) => {
    const newSections = [...get().sections, section];
    set({ sections: newSections });
    get().addToHistory(newSections);
  },
  
  removeSection: (id) => {
    const newSections = get().sections.filter(s => s.id !== id);
    set({ sections: newSections, selectedSectionId: null });
    get().addToHistory(newSections);
  },
  
  updateSection: (id, updates) => {
    const newSections = get().sections.map(s => 
      s.id === id ? { ...s, ...updates } : s
    );
    set({ sections: newSections });
    get().addToHistory(newSections);
  },
  
  reorderSections: (fromIndex, toIndex) => {
    const newSections = [...get().sections];
    const [removed] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, removed);
    
    // Update order property
    newSections.forEach((section, index) => {
      section.order = index;
    });
    
    set({ sections: newSections });
    get().addToHistory(newSections);
  },
  
  duplicateSection: (id) => {
    const sectionToDuplicate = get().sections.find(s => s.id === id);
    if (!sectionToDuplicate) return;
    
    const newSection: Section = {
      ...JSON.parse(JSON.stringify(sectionToDuplicate)),
      id: `section-${Date.now()}`,
      adminLabel: `${sectionToDuplicate.adminLabel} (Copy)`,
      order: get().sections.length,
    };
    
    const newSections = [...get().sections, newSection];
    set({ sections: newSections });
    get().addToHistory(newSections);
  },
  
  selectSection: (id) => set({ selectedSectionId: id }),
  toggleIsolatedMode: (enabled) => set({ isIsolatedMode: enabled }),
  
  // Element state
  selectedElementId: null,
  setSelectedElement: (id) => set({ selectedElementId: id }),
  
  // Device preview
  deviceSize: 'desktop',
  setDeviceSize: (size) => set({ deviceSize: size }),
  
  // Global settings
  siteSettings: defaultSiteSettings,
  headerSettings: null,
  footerSettings: null,
  updateSiteSettings: (settings) => {
    const currentSettings = get().siteSettings;
    if (currentSettings) {
      set({ siteSettings: { ...currentSettings, ...settings } });
    }
  },
  
  // UI state
  leftDockOpen: true,
  rightInspectorOpen: true,
  toggleLeftDock: () => set((state) => ({ leftDockOpen: !state.leftDockOpen })),
  toggleRightInspector: () => set((state) => ({ rightInspectorOpen: !state.rightInspectorOpen })),
  
  // Undo/Redo
  history: [[]],
  historyIndex: -1,
  addToHistory: (sections) => {
    const currentState = get();
    const newHistory = currentState.history.slice(0, currentState.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(sections)));
    
    // Limit history to 50 actions
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({ 
      history: newHistory, 
      historyIndex: newHistory.length - 1 
    });
  },
  
  undo: () => {
    const currentState = get();
    if (currentState.historyIndex > 0) {
      const newIndex = currentState.historyIndex - 1;
      set({ 
        sections: JSON.parse(JSON.stringify(currentState.history[newIndex])),
        historyIndex: newIndex 
      });
    }
  },
  
  redo: () => {
    const currentState = get();
    if (currentState.historyIndex < currentState.history.length - 1) {
      const newIndex = currentState.historyIndex + 1;
      set({ 
        sections: JSON.parse(JSON.stringify(currentState.history[newIndex])),
        historyIndex: newIndex 
      });
    }
  },
  
  // Dark mode
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Accessibility
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  setFontSize: (size) => set({ fontSize: size }),
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
  
  // Language
  currentLanguage: 'en',
  setLanguage: (lang) => set({ currentLanguage: lang }),
}));
