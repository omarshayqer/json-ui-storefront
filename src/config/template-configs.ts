
import { PageConfig } from './page-config';
import templatesData from './templates.json';

// Type for the JSON template structure
interface TemplatesData {
  [key: string]: {
    pages: PageConfig[];
  };
}

// Cast the imported JSON data to our interface
const templates = templatesData as TemplatesData;

// Function to select a template config based on template name
export function getTemplateConfig(templateName: string = 'standard'): PageConfig[] {
  const template = templates[templateName.toLowerCase()];
  if (template) {
    return template.pages;
  }
  // Default to standard if template not found
  return templates.standard.pages;
}
