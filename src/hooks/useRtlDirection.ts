
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useRtlDirection() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set the document direction based on the current language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    
    // Add a CSS class for additional RTL/LTR styling
    document.documentElement.classList.remove('lang-en', 'lang-ar');
    document.documentElement.classList.add(`lang-${i18n.language}`);
    
  }, [i18n.language]);
  
  return { isRtl: i18n.language === 'ar' };
}
