// src/pages/Editor/Editor.tsx
import { useState } from 'react';
import styles from './Editor.module.css';
import { Card } from '../../components/Card/Card';
import { LayerPanel } from '../../components/LayerPanel/LayerPanel';
import type { Layer } from '../../types';

export function Editor() {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 1, name: 'Fundo', type: 'background', visible: true,
      options: {
        type: 'gradient', solidColor: '#ffffff', solidOpacity: 1,
        gradientAngle: 135,
        gradientColors: [ { color: '#6a89cc', opacity: 1 }, { color: '#3d3bbe', opacity: 1 } ],
      },
    },
    {
      id: 2, name: 'Conteúdo', type: 'widget-grid', visible: true,
      options: {
        type: 'solid', // Placeholder de tipo
        colSizes: ['1fr'], rowSizes: ['1fr'],
        widgets: [
          { id: 101, type: 'nome', content: 'Seu Nome Aqui', gridCell: 0, styles: { color: '#ffffff', fontSize: '28px', fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }},
          { id: 102, type: 'profissao', content: 'Sua Profissão', gridCell: 0, styles: { color: '#ffffff', fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }},
        ],
      }
    }
  ]);

  const handleDropOnCard = (cellIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    console.log(`Item solto na célula ${cellIndex}`);
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.controlsPanel}>
        <header className={styles.panelHeader}>
          <h1>Editor de Cartão</h1>
          <p>Gerencie as camadas do seu cartão.</p>
        </header>
        <div className={styles.controlSection}>
          <LayerPanel layers={layers} setLayers={setLayers} />
        </div>
      </div>
      <div className={styles.previewPanel}>
        <h2>Pré-visualização</h2>
        <div className={styles.cardPreviewWrapper}>
          <Card layers={layers} onDrop={handleDropOnCard} />
        </div>
      </div>
    </div>
  );
}