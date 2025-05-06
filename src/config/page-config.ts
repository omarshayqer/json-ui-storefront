
// This file contains the JSON configuration for our pages
import { getTemplateConfig } from './template-configs';

export interface ComponentConfig {
  id: string;
  type: string;
  props?: Record<string, any>;
}

export interface PageConfig {
  page: string;
  title: string;
  components: ComponentConfig[];
}

// Use the standard template by default
// This can be changed to 'premium' or 'minimal' to use other templates
const selectedTemplate = 'standard';
export const pagesConfig: PageConfig[] = getTemplateConfig(selectedTemplate);

// Helper function to get config for a specific page
export function getPageConfig(pageName: string): PageConfig | undefined {
  return pagesConfig.find(config => config.page === pageName);
}
