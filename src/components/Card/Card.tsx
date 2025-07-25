// src/components/Card/Card.tsx
import styles from './Card.module.css';
import type { BackgroundOptions } from '../BackgroundControls/BackgroundControls';
import type { OverlayOptions } from '../OverlayControls/OverlayControls';
import type { Widget } from '../../types';

// Função auxiliar para converter HEX para RGBA
function hexToRgba(hex: string, alpha: number | string = 1): string {
    const numericAlpha = typeof alpha === 'string' ? parseFloat(alpha) : alpha;
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r},${g},${b},${numericAlpha})`;
}

interface CardProps {
  widgets: Widget[];
  colSizes: string[];
  rowSizes: string[];
  background: BackgroundOptions;
  overlay: OverlayOptions;
  onDrop: (cellIndex: number, e: React.DragEvent) => void;
}

export function Card({ widgets, colSizes, rowSizes, background, overlay, onDrop }: CardProps) {
  
  const backgroundLayer = background.type === 'solid'
    ? hexToRgba(background.solidColor, background.solidOpacity)
    // Corrigido para verificar se gradientColors existe antes de mapear
    : `linear-gradient(${background.gradientAngle}deg, ${(background.gradientColors || []).map(c => hexToRgba(c.color, c.opacity)).join(', ')})`;

  let overlayLayer = '';
  if (overlay.isActive) {
    overlayLayer = overlay.type === 'solid'
      ? hexToRgba(overlay.solidColor, overlay.solidOpacity)
      // Corrigido para verificar se gradientColors existe antes de mapear
      : `linear-gradient(${overlay.gradientAngle}deg, ${(overlay.gradientColors || []).map(c => hexToRgba(c.color, c.opacity)).join(', ')})`;
  }
  
  const combinedBackground = overlayLayer ? `${overlayLayer}, ${backgroundLayer}` : backgroundLayer;

  const handleDragStart = (e: React.DragEvent, widgetId: number) => { 
    e.dataTransfer.setData('widgetId', widgetId.toString()); 
  };

  const totalCells = colSizes.length * rowSizes.length;
  const cells = Array.from({ length: totalCells }, (_, i) => (
    <div 
      key={i} 
      className={styles.gridCell}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(i, e)}
    >
      {widgets
        .filter(w => w.gridCell === i)
        .map(widget => (
          <div 
            key={widget.id} 
            className={styles.widget}
            draggable
            onDragStart={(e) => handleDragStart(e, widget.id)}
            style={widget.styles}
          >
            {['logo', 'qrcode'].includes(widget.type) 
              ? <img src={widget.content || 'https://via.placeholder.com/100'} alt={widget.type} className={styles.widgetImage} />
              : widget.content
            }
          </div>
      ))}
    </div>
  ));

  return (
    <div className={styles.portaCartao}>
      <div className={styles.cartao}>
        <div 
          className={styles.ladoFrente}
          style={{ 
            gridTemplateColumns: colSizes.join(' '), 
            gridTemplateRows: rowSizes.join(' '),
            background: combinedBackground,
          }}
        >
          {cells}
        </div>
      </div>
    </div>
  );
}