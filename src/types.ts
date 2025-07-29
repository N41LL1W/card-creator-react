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
  type: 'texto' | 'imagem'; // Tipos genéricos para permitir repetição
  label: string; // O nome que o usuário vê (ex: "Nome Principal", "Logo Empresa")
  content: string;
  gridCell: number; // Posição dentro da camada de grid
  styles: WidgetStyles;
}

export interface LayerOptions {
  type: 'solid' | 'gradient' | 'image' | 'grid';
  solidColor?: string;
  solidOpacity?: number;
  gradientAngle?: number;
  gradientColors?: GradientColorStop[];
  imageUrl?: string;
  imageOpacity?: number;
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