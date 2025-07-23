// src/components/Card/Card.tsx
import styles from './Card.module.css';
import type { BackgroundOptions } from '../../components/BackgroundControls/BackgroundControls';
import type { Widget } from '../../types';

interface CardProps {
  widgets: Widget[];
  colSizes: string[];
  rowSizes: string[];
  background: BackgroundOptions;
  onDrop: (cellIndex: number, e: React.DragEvent) => void;
}

export function Card({ widgets, colSizes, rowSizes, background, onDrop }: CardProps) {
  const backgroundStyle = background.type === 'solid'
    ? background.solidColor
    : `linear-gradient(${background.gradientAngle}deg, ${background.gradientColors.join(', ')})`;

  // Função para lidar com o início do arraste de um widget JÁ NO CARTÃO
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
            style={widget.styles} // Aplica todos os estilos do objeto
          >
            {/* Renderiza o conteúdo com base no tipo */}
            {['logo', 'qrcode'].includes(widget.type) 
              ? <img src={widget.content || 'https://via.placeholder.com/100'} alt={widget.type} />
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
            background: backgroundStyle,
          }}
        >
          {cells}
        </div>
      </div>
    </div>
  );
}