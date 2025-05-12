
// This file contains the configuration for our pages
import { getTemplateConfig, getTemplateNavigation, NavigationItem, TemplateNavigation } from './template-configs';
import { create } from 'zustand';

export interface StyleConfig {
  height?: string;
  width?: string;
  colors?: {
    background?: string;
    text?: string;
    border?: string;
  };
  border?: {
    width?: string;
    style?: string;
    radius?: string;
  };
  shadow?: string;
  padding?: string;
  margin?: string;
}

export interface ComponentConfig {
  id: string;
  type: string;
  props?: Record<string, any>;
  style?: StyleConfig;
}

export interface PageConfig {
  page: string;
  title: string;
  components: ComponentConfig[];
}

// Store to manage template selection and navigation
interface TemplateStore {
  selectedTemplate: string;
  setTemplate: (template: string) => void;
  navigation: TemplateNavigation | null;
  setNavigation: (navigation: TemplateNavigation) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplate: 'standard',
  setTemplate: (template) => set({ selectedTemplate: template }),
  navigation: null,
  setNavigation: (navigation) => set({ navigation }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}));

// Helper function to get config for a specific page
export async function getPageConfig(pageName: string): Promise<PageConfig | undefined> {
  const selectedTemplate = useTemplateStore.getState().selectedTemplate;
  const pages = await getTemplateConfig(selectedTemplate);
  return pages.find(config => config.page === pageName);
}

// Function to get all available templates
export const getAvailableTemplates = () => [
  { id: 'standard', name: 'Standard' },
  { id: 'premium', name: 'Premium' },
  { id: 'minimal', name: 'Minimal' }
];

// Function to load navigation for the current template
export const loadTemplateNavigation = async () => {
  const { selectedTemplate, setNavigation, setIsLoading } = useTemplateStore.getState();
  setIsLoading(true);
  
  try {
    const navigation = await getTemplateNavigation(selectedTemplate);
    setNavigation(navigation);
  } catch (error) {
    console.error('Failed to load navigation:', error);
  } finally {
    setIsLoading(false);
  }
};
