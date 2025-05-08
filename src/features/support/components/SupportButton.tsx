
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface SupportButtonProps {
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark';
}

export default function SupportButton({
  position = 'bottom-right',
  theme = 'light'
}: SupportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const positionClasses = {
    'bottom-right': 'right-6 bottom-6',
    'bottom-left': 'left-6 bottom-6'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support query:', formState);
    toast.success("Thank you! We'll get back to you soon.");
    setFormState({ name: '', email: '', message: '' });
    setIsOpen(false);
  };

  return (
    <div className={`fixed z-50 ${positionClasses[position]}`}>
      {/* Support Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg w-80 sm:w-96 overflow-hidden animate-fade-in">
          <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-brand text-white'} p-4 flex justify-between items-center`}>
            <h3 className="font-medium">Customer Support</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="message">How can we help?</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
            
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              <p>Need immediate assistance?</p>
              <p className="mt-1">Call us at (555) 123-4567</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Support Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full shadow-lg h-14 w-14 ${
          theme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-brand hover:bg-brand-dark'
        } ${isOpen ? 'rotate-90' : ''} transition-transform`}
      >
        {isOpen ? (
          <ChevronRight className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
