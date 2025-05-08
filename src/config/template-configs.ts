
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
