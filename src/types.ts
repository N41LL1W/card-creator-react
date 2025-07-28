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
  gridCell: number;
  styles: WidgetStyles;
}

// PADRONIZADO: Ambos usam GradientColorStop
export interface BackgroundOptions {
  type: 'solid' | 'gradient';
  solidColor: string;
  solidOpacity: number;
  gradientAngle: number;
  gradientColors: GradientColorStop[];
}

export interface OverlayOptions {
  isActive: boolean;
  type: 'solid' | 'gradient';
  solidColor: string;
  solidOpacity: number;
  gradientAngle: number;
  gradientColors: GradientColorStop[];
}

// Tipo unificado para LayerOptions
export interface LayerOptions extends Partial<BackgroundOptions> {
    colSizes?: string[];
    rowSizes?: string[];
    widgets?: Widget[];
}

export interface Layer {
  id: number;
  name: string;
  type: 'background' | 'widget-grid';
  visible: boolean;
  options: LayerOptions;
}