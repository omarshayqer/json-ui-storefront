
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTemplateStore } from '@/config/page-config';
import { loadTemplateNavigation } from '@/config/page-config';
import { NavigationItem } from '@/config/template-configs';
import { 
  Home, ShoppingCart, Info, Package, User, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { useTranslation } from 'react-i18next';

// Map of icon names to icon components
const iconMap: Record<string, React.ComponentType> = {
  home: Home,
  'shopping-cart': ShoppingCart,
  info: Info,
  package: Package,
  user: User,
};

export default function DynamicNav() {
  const { selectedTemplate, navigation, isLoading } = useTemplateStore();
  const location = useLocation();
  const { t } = useTranslation();
  
  useEffect(() => {
    loadTemplateNavigation();
  }, [selectedTemplate]);
  
  if (isLoading || !navigation) {
    return (
      <div className="flex gap-4">
        <Button variant="ghost" size="icon" disabled>
          <Home className="h-5 w-5 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <ShoppingCart className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Main navigation items */}
      <div className="hidden md:flex space-x-1">
        {navigation.items.map((item) => {
          const Icon = iconMap[item.icon] || Home;
          const isActive = location.pathname === item.link;
          
          return (
            <Link 
              key={item.text} 
              to={item.link} 
              className={`px-3 py-2 text-gray-700 hover:text-brand flex items-center gap-2 ${
                isActive ? 'text-brand font-medium' : ''
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(`header.${item.text.toLowerCase()}`)}
            </Link>
          );
        })}
      </div>

      {/* User account menu */}
      <Menubar className="hidden md:flex border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer px-3 py-2 text-gray-700 hover:text-brand">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{t('header.account')}</span>
            </div>
          </MenubarTrigger>
          <MenubarContent>
            {navigation.accountItems
              .filter(item => !item.requiredPlan || item.requiredPlan === selectedTemplate)
              .map(item => {
                const Icon = iconMap[item.icon] || Package;
                return (
                  <MenubarItem key={item.text} asChild>
                    <Link to={item.link} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {t(`header.${item.text.toLowerCase()}`)}
                    </Link>
                  </MenubarItem>
                );
              })}
              
            <MenubarSeparator />
            <MenubarItem>
              <div className="flex items-center gap-2">
                Current Plan: <span className="font-medium capitalize">{selectedTemplate}</span>
              </div>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
