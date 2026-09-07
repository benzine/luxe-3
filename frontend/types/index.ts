export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  typography: TypographySettings;
  spacing: SpacingSettings;
  borders: BorderSettings;
  shadows: ShadowSettings;
  breakpoints: BreakpointSettings;
  container: ContainerSettings;
}

export interface TypographySettings {
  fontFamilyBase: string;
  fontFamilyHeadings: string;
  fontSizes: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    body: string;
    small: string;
  };
  fontWeights: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
  lineHeights: {
    tight: number;
    base: number;
    relaxed: number;
  };
}

export interface SpacingSettings {
  padding: {
    section: string;
    container: string;
  };
  gaps: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface BorderSettings {
  defaultRadius: string;
  borderWidths: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface ShadowSettings {
  presets: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface BreakpointSettings {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

export interface ContainerSettings {
  maxWidth: string;
  sidePadding: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface Section {
  id: string;
  adminLabel: string;
  moduleType: string;
  isVisible: boolean;
  deviceVisibility: 'all' | 'desktop' | 'tablet' | 'mobile';
  order: number;
  settings: SectionSettings;
  content: Record<string, unknown>;
  isGlobal?: boolean;
  isLocked?: boolean;
}

export interface SectionSettings {
  layout: LayoutSettings;
  background: BackgroundSettings;
  border: BorderConfig;
  shadow: ShadowConfig;
  spacing: SectionSpacing;
  animation?: AnimationSettings;
  customClasses?: string;
  customId?: string;
}

export interface LayoutSettings {
  width: 'full' | 'contained';
  maxWidth?: string;
  height: 'auto' | 'custom' | 'viewport';
  heightValue?: string;
  columns: number;
  verticalAlign: 'top' | 'center' | 'bottom' | 'space-between';
  horizontalAlign: 'left' | 'center' | 'right';
}

export interface BackgroundSettings {
  type: 'color' | 'gradient' | 'image' | 'video';
  color?: string;
  gradient?: string;
  image?: string;
  imagePosition?: string;
  imageSize?: string;
  imageRepeat?: string;
  videoUrl?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

export interface BorderConfig {
  width: string;
  style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  color: string;
  radius: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

export interface ShadowConfig {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

export interface SectionSpacing {
  padding: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

export interface AnimationSettings {
  entrance: 'fade' | 'slide' | 'zoom' | 'flip' | 'bounce' | 'none';
  trigger: 'load' | 'scroll';
  duration: number;
  delay: number;
  easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  repeat: boolean;
}

export interface ModuleContent {
  // Text Module
  text?: string;
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  
  // Heading Module
  heading?: string;
  subHeading?: string;
  gradientText?: boolean;
  
  // Button Module
  buttonText?: string;
  buttonLink?: string;
  buttonTarget?: '_self' | '_blank';
  buttonStyle?: 'solid' | 'outline' | 'gradient' | 'ghost' | '3d' | 'underline' | 'pill';
  buttonIcon?: string;
  iconPosition?: 'left' | 'right';
  
  // Image Module
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSize?: 'thumbnail' | 'medium' | 'large' | 'full' | 'custom';
  imageWidth?: string;
  imageHeight?: string;
  imageLink?: string;
  
  // List-based modules
  items?: ListItem[];
  
  // Form Module
  formFields?: FormField[];
  formSubmitButton?: string;
  formSuccessMessage?: string;
  formErrorMessage?: string;
  
  // Testimonial Module
  testimonials?: TestimonialItem[];
  
  // Team Module
  teamMembers?: TeamMember[];
  
  // Pricing Module
  pricingPlans?: PricingPlan[];
  
  // Accordion/Tabs Module
  accordionItems?: AccordionItem[];
  
  // Counter/Stats Module
  stats?: StatItem[];
  
  // Timeline Module
  timelineItems?: TimelineItem[];
  
  // Logo Carousel
  logos?: LogoItem[];
}

export interface ListItem {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  link?: string;
  image?: string;
  order: number;
}

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'email' | 'phone' | 'number' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'password' | 'hidden';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select, radio, checkbox
  validationRules?: string;
  errorMessage?: string;
  width: 'full' | 'half' | 'third' | 'quarter';
  order: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  order: number;
}

export interface TeamMember {
  id: string;
  photo: string;
  name: string;
  role: string;
  bio: string;
  socialLinks: SocialLink[];
  email?: string;
  phone?: string;
  order: number;
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github';
  url: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  currency: string;
  period: 'month' | 'year';
  description: string;
  features: FeatureItem[];
  ctaText: string;
  ctaLink: string;
  isFeatured: boolean;
  order: number;
}

export interface FeatureItem {
  text: string;
  isAvailable: boolean;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  iconOpen?: string;
  iconClosed?: string;
  order: number;
}

export interface StatItem {
  id: string;
  number: string;
  prefix?: string;
  suffix?: string;
  label: string;
  icon?: string;
  order: number;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  order: number;
}

export interface LogoItem {
  id: string;
  logo: string;
  link?: string;
  alt: string;
  order: number;
}

export interface HeaderSettings {
  layout: 'default' | 'sticky' | 'transparent' | 'stacked' | 'centered' | 'split';
  elements: HeaderElement[];
  background: BackgroundSettings;
  sticky: {
    enabled: boolean;
    scrollOffset: number;
    styleChange: boolean;
  };
  mobile: {
    hamburgerStyle: 'classic' | 'arrow' | 'squeeze';
    slideInDirection: 'left' | 'right';
    overlayColor: string;
  };
}

export interface HeaderElement {
  id: string;
  type: 'logo' | 'siteTitle' | 'navigation' | 'button' | 'search' | 'social' | 'language' | 'cart' | 'user' | 'html' | 'contact';
  position: 'left' | 'center' | 'right';
  settings: Record<string, unknown>;
  hideOnBreakpoints: ('desktop' | 'tablet' | 'mobile')[];
}

export interface FooterSettings {
  rows: FooterRow[];
  background: BackgroundSettings;
  revealAnimation: boolean;
}

export interface FooterRow {
  id: string;
  columns: FooterColumn[];
}

export interface FooterColumn {
  id: string;
  width: string;
  widgets: FooterWidget[];
}

export interface FooterWidget {
  id: string;
  type: 'text' | 'menu' | 'logo' | 'social' | 'contact' | 'newsletter' | 'posts' | 'image' | 'copyright' | 'payment' | 'instagram';
  settings: Record<string, unknown>;
}

export interface PageData {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
  seo: SeoData;
  isPublished: boolean;
  publishedAt?: string;
  updatedAt: string;
}

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex: boolean;
  noFollow: boolean;
  schemaMarkup?: Record<string, unknown>;
}

export type DeviceSize = 'desktop' | 'tablet' | 'mobile';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    fr: string;
    es: string;
    de: string;
  };
}
