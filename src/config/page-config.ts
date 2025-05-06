
// This file contains the JSON configuration for our pages
import { getTemplateConfig } from './template-configs';
import { create } from 'zustand';

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

// Store to manage template selection
interface TemplateStore {
  selectedTemplate: string;
  setTemplate: (template: string) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplate: 'standard',
  setTemplate: (template) => set({ selectedTemplate: template }),
}));

// Helper function to get config for a specific page
export function getPageConfig(pageName: string): PageConfig | undefined {
  const selectedTemplate = useTemplateStore.getState().selectedTemplate;
  return getTemplateConfig(selectedTemplate).find(config => config.page === pageName);
}

// Function to get all available templates
export const getAvailableTemplates = () => [
  { id: 'standard', name: 'Standard' },
  { id: 'premium', name: 'Premium' },
  { id: 'minimal', name: 'Minimal' }
];
