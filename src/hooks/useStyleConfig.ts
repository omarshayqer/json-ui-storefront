
import { CSSProperties, useMemo } from 'react';
import { StyleConfig } from '@/config/page-config';

export function useStyleConfig(style?: StyleConfig): CSSProperties {
  return useMemo(() => {
    if (!style) return {};

    const styleProperties: CSSProperties = {};
    
    // Apply height and width
    if (style.height) styleProperties.height = style.height;
    if (style.width) styleProperties.width = style.width;
    
    // Apply colors
    if (style.colors) {
      if (style.colors.background) styleProperties.backgroundColor = style.colors.background;
      if (style.colors.text) styleProperties.color = style.colors.text;
      if (style.colors.border) styleProperties.borderColor = style.colors.border;
    }
    
    // Apply border styles
    if (style.border) {
      const borderStyles: string[] = [];
      
      if (style.border.width) borderStyles.push(style.border.width);
      if (style.border.style) borderStyles.push(style.border.style);
      if (style.border.radius) styleProperties.borderRadius = style.border.radius;
      
      if (borderStyles.length > 0) {
        styleProperties.border = borderStyles.join(' ');
        if (!styleProperties.borderColor) styleProperties.borderColor = 'currentColor';
      }
    }
    
    // Apply shadow
    if (style.shadow) styleProperties.boxShadow = style.shadow;
    
    // Apply spacing
    if (style.padding) styleProperties.padding = style.padding;
    if (style.margin) styleProperties.margin = style.margin;
    
    return styleProperties;
  }, [style]);
}
