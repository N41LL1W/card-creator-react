// src/components/Card/Card.tsx
import styles from './Card.module.css';
import type { BackgroundOptions } from '../BackgroundControls/BackgroundControls';
import type { OverlayOptions } from '../OverlayControls/OverlayControls';
import type { Widget } from '../../types';

// Função auxiliar limpa, sem conversão de tipo
function hexToRgba(hex: string, alpha: number = 1): string {
    let r=0,g=0,b=0;
    if(hex.length==4){r="0x"+hex[1]+hex[1];g="0x"+hex[2]+hex[2];b="0x"+hex[3]+hex[3];}
    else if(hex.length==7){r="0x"+hex[1]+hex[2];g="0x"+hex[3]+hex[4];b="0x"+hex[5]+hex[6];}
    return `rgba(${+r},${+g},${+b},${alpha})`;
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
    ? background.solidColor
    : `linear-gradient(${background.gradientAngle}deg, ${background.gradientColors.join(', ')})`;

  let overlayLayer = '';
  if (overlay.isActive) {
    overlayLayer = overlay.type === 'solid'
      // Não precisa mais de conversão, pois os dados já são números
      ? hexToRgba(overlay.solidColor, overlay.solidOpacity)
      : `linear-gradient(${overlay.gradientAngle}deg, ${overlay.gradientColors.map(c => 
          hexToRgba(c.color, c.opacity)
        ).join(', ')})`;
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