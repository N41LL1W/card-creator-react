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
  type: 'nome' | 'profissao' | 'contato' | 'endereco' | 'logo' | 'qrcode';
  content: string;
  gridCell: number; // Posição dentro da camada de grid
  styles: WidgetStyles;
}

// Opções detalhadas para cada tipo de camada
export interface LayerOptions {
  // Para fundo/sobreposição
  type: 'solid' | 'gradient' | 'image' | 'grid'; // 'grid' para a camada de widgets
  solidColor?: string;
  solidOpacity?: number;
  gradientAngle?: number;
  gradientColors?: GradientColorStop[];
  imageUrl?: string;
  imageOpacity?: number;
  // Para a camada de grid
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