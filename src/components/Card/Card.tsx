// src/components/Card/Card.tsx
import styles from './Card.module.css';
import type { Layer, Widget } from '../../types';

function hexToRgba(hex: string, alpha: number): string {
    let r=0,g=0,b=0;
    if(hex.length===4){r=parseInt(hex[1]+hex[1],16);g=parseInt(hex[2]+hex[2],16);b=parseInt(hex[3]+hex[3],16);}
    else if(hex.length===7){r=parseInt(hex[1]+hex[2],16);g=parseInt(hex[3]+hex[4],16);b=parseInt(hex[5]+hex[6],16);}
    return `rgba(${r},${g},${b},${alpha})`;
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

            if (layer.type === 'background' || layer.type === 'overlay') {
                if (options.type === 'solid') {
                    style.background = hexToRgba(options.solidColor!, options.solidOpacity!);
                } else if (options.type === 'gradient' && options.gradientColors) {
                    style.background = `linear-gradient(${options.gradientAngle}deg, ${options.gradientColors.map(c => hexToRgba(c.color, c.opacity)).join(', ')})`;
                } else if (options.type === 'image' && options.imageUrl) {
                    style.background = `url('${options.imageUrl}') no-repeat center center / cover`;
                    style.opacity = options.imageOpacity;
                }
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
                      <div 
                        key={widget.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('widgetId', widget.id.toString())}
                        style={widget.styles}
                      >
                        {widget.type === 'imagem'
                          ? <img src={widget.content || 'https://via.placeholder.com/100'} alt={widget.label} className={styles.widgetImage} />
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