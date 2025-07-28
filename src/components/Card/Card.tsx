// src/components/Card/Card.tsx
import styles from './Card.module.css';
import type { Layer, Widget } from '../../types';

function hexToRgba(hex: string, alpha: number): string { // Espera um número
    let r=0,g=0,b=0;
    if(hex.length===4){r="0x"+hex[1]+hex[1];g="0x"+hex[2]+hex[2];b="0x"+hex[3]+hex[3];}
    else if(hex.length===7){r="0x"+hex[1]+hex[2];g="0x"+hex[3]+hex[4];b="0x"+hex[5]+hex[6];}
    return `rgba(${+r},${+g},${+b},${alpha})`;
}

interface CardProps {
  layers: Layer[];
  onDrop: (cellIndex: number, e: React.DragEvent) => void;
}

export function Card({ layers, onDrop }: CardProps) {
  return (
    <div className={styles.portaCartao}>
      <div className={styles.cartao}>
        {layers
          .filter(layer => layer.visible)
          .map((layer, index) => {
            let style: React.CSSProperties = {};
            let content: React.ReactNode = null;
            const options = layer.options;

            if (layer.type === 'background') {
              const bgLayer = options.type === 'solid'
                ? hexToRgba(options.solidColor!, options.solidOpacity!)
                : `linear-gradient(${options.gradientAngle}deg, ${options.gradientColors!.map(c => hexToRgba(c.color, c.opacity)).join(', ')})`;
              style.background = bgLayer;
            }

            if (layer.type === 'widget-grid' && options.colSizes && options.rowSizes) {
              style.display = 'grid';
              style.gridTemplateColumns = options.colSizes.join(' ');
              style.gridTemplateRows = options.rowSizes.join(' ');

              const totalCells = options.colSizes.length * options.rowSizes.length;
              content = Array.from({ length: totalCells }, (_, i) => (
                <div key={i} className={styles.gridCell} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(i, e)}>
                  {(options.widgets || [])
                    .filter((w: Widget) => w.gridCell === i)
                    .map((widget: Widget) => (
                      <div key={widget.id} style={widget.styles}>
                        {['logo', 'qrcode'].includes(widget.type)
                          ? <img src={widget.content || 'https://via.placeholder.com/100'} alt={widget.type} className={styles.widgetImage} />
                          : widget.content}
                      </div>
                    ))}
                </div>
              ));
            }

            return (
              <div key={layer.id} className={styles.layer} style={{ ...style, zIndex: index }} >
                {content}
              </div>
            );
        })}
      </div>
    </div>
  );
}