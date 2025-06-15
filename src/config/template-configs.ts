import { PageConfig } from './page-config';

// Create a type for the navigation structure
export interface NavigationItem {
  text: string;
  link: string;
  icon: string;
  requiredPlan?: string;
}

export interface TemplateNavigation {
  items: NavigationItem[];
  accountItems: NavigationItem[];
}

// Type for the JSON template structure
export interface TemplateData {
  pages: PageConfig[];
  navigation: TemplateNavigation;
}

// Function to load template data from specific JSON file
async function loadTemplateData(templateName: string): Promise<TemplateData> {
  try {
    const response = await fetch(`/src/config/templates/${templateName.toLowerCase()}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load template data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading template data for ${templateName}:`, error);
    // Return empty template as fallback
    return { 
      pages: [], 
      navigation: { 
        items: [],
        accountItems: []
      } 
    };
  }
}

// Cache for loaded templates to prevent repeated fetches
const templateCache: Record<string, TemplateData> = {};

// Function to select a template config based on template name
export async function getTemplateData(templateName: string = 'standard'): Promise<TemplateData> {
  const name = templateName.toLowerCase();
  
  // Check if template is already in cache
  if (!templateCache[name]) {
    try {
      templateCache[name] = await loadTemplateData(name);
    } catch (error) {
      console.error(`Failed to load template ${name}, using standard as fallback`);
      
      // If standard template fails to load, provide minimal fallback
      if (name !== 'standard') {
        return getTemplateData('standard');
      } else {
        return { 
          pages: [], 
          navigation: { 
            items: [],
            accountItems: []
          } 
        };
      }
    }
  }
  
  return templateCache[name];
}

// Function to get pages configuration only
export async function getTemplateConfig(templateName: string = 'standard'): Promise<PageConfig[]> {
  const templateData = await getTemplateData(templateName);
  return templateData.pages;
}

// Function to get navigation configuration only
export async function getTemplateNavigation(templateName: string = 'standard'): Promise<TemplateNavigation> {
  const templateData = await getTemplateData(templateName);
  return templateData.navigation;
}

export const templateConfigs: TemplateConfig[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with essential features',
    category: 'Basic',
    features: ['Product listing', 'Cart functionality', 'Basic checkout'],
    colors: { primary: '#000000', secondary: '#ffffff', accent: '#f5f5f5' },
    configPath: '/templates/minimal.json'
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Balanced design with comprehensive eCommerce features',
    category: 'Popular',
    features: ['Advanced product display', 'Customer reviews', 'Wishlist', 'Search & filters'],
    colors: { primary: '#2563eb', secondary: '#ffffff', accent: '#f1f5f9' },
    configPath: '/templates/standard.json'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury design with advanced features for high-end stores',
    category: 'Professional',
    features: ['Premium layouts', 'Advanced analytics', 'Customer accounts', 'Order tracking'],
    colors: { primary: '#7c3aed', secondary: '#ffffff', accent: '#faf5ff' },
    configPath: '/templates/premium.json'
  },
  {
    id: 'showcase',
    name: 'Component Showcase',
    description: 'Demonstrates all available component variants and layouts',
    category: 'Demo',
    features: ['All product displays', 'Multiple grid variants', 'Showcase layouts', 'All component types'],
    colors: { primary: '#059669', secondary: '#ffffff', accent: '#f0fdf4' },
    configPath: '/templates/showcase.json'
  }
];
