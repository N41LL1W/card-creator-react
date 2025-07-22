// src/components/Card/Card.tsx
import styles from './Card.module.css';
import type { BackgroundOptions } from '../BackgroundControls/BackgroundControls';

interface CardProps {
  nome: string;
  profissao: string;
  colSizes: string[];
  rowSizes: string[];
  background: BackgroundOptions;
}

export function Card({ nome, profissao, colSizes, rowSizes, background }: CardProps) {
  const backgroundStyle = background.type === 'solid'
    ? background.solidColor
    : `linear-gradient(${background.gradientAngle}deg, ${background.gradientColors.join(', ')})`;

  const totalCells = colSizes.length * rowSizes.length;
  const cells = Array.from({ length: totalCells }, (_, i) => (
    <div key={i} className={styles.gridCell}>
      {/* Lógica de exemplo para posicionar: coloca na primeira célula.
          Isto será substituído pelo sistema de Drag & Drop no futuro. */}
      {i === 0 && (
        <div className={styles.infoContainer}>
          <h1 className={styles.infoNome}>{nome || 'Seu Nome'}</h1>
          <p className={styles.infoProfissao}>{profissao || 'Sua Profissão'}</p>
        </div>
      )}
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
            color: '#ffffff',
          }}
        >
          {cells}
        </div>
      </div>
    </div>
  );
}