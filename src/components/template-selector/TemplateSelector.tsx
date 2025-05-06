
import { useState } from 'react';
import { useTemplateStore, getAvailableTemplates } from '@/config/page-config';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useTemplateStore();
  const [localTemplate, setLocalTemplate] = useState(selectedTemplate);
  const templates = getAvailableTemplates();

  const handleTemplateChange = (template: string) => {
    setLocalTemplate(template);
  };

  const handleApplyTemplate = () => {
    setTemplate(localTemplate);
    toast.success(`Template changed to ${templates.find(t => t.id === localTemplate)?.name}`);
    // Force reload to apply the new template
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 bg-white p-4 rounded-lg shadow-lg border z-50">
      <div className="flex items-center gap-2 w-full">
        <Select value={localTemplate} onValueChange={handleTemplateChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name} Template
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          onClick={handleApplyTemplate}
          disabled={localTemplate === selectedTemplate}
        >
          Apply
        </Button>
      </div>
      <div className="text-xs text-gray-500 italic">
        Changing template will reload the page
      </div>
    </div>
  );
}
