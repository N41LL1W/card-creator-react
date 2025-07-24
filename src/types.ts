// src/types.ts
export interface WidgetStyles {
  color: string;
  fontSize: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
  fontFamily: string; // Adicionada esta linha
}

export interface Widget {
  id: number;
  type: 'nome' | 'profissao' | 'contato' | 'endereco' | 'logo' | 'qrcode';
  content: string;
  gridCell: number;
  styles: WidgetStyles;
}