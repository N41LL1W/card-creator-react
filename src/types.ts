// src/types.ts
export interface GradientColorStop {
  color: string;
  opacity: number;
}

export interface WidgetStyles {
  color: string;
  fontSize: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
  fontFamily: string;
}

export interface Widget {
  id: number;
  type: 'texto' | 'imagem';
  label: string;
  content: string;
  gridCell: number;
  styles: WidgetStyles;
}

// Opções detalhadas para cada tipo de camada
export interface LayerOptions {
  type: 'solid' | 'gradient' | 'image' | 'grid';
  solidColor?: string;
  solidOpacity?: number;
  gradientAngle?: number;
  gradientColors?: GradientColorStop[];
  imageUrl?: string; // NOVO
  imageOpacity?: number; // NOVO
  colSizes?: string[];
  rowSizes?: string[];
  widgets?: Widget[];
}

export interface Layer {
  id: number;
  name: string;
  type: 'background' | 'widget-grid' | 'overlay';
  visible: boolean;
  options: LayerOptions;
}