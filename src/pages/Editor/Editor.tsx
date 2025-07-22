// src/pages/Editor/Editor.tsx
import { useState } from 'react';
import styles from './Editor.module.css';
import { Card } from '../../components/Card/Card';
import { GridControls } from '../../components/GridControls/GridControls';
import { BackgroundControls } from '../../components/BackgroundControls/BackgroundControls';
import type { BackgroundOptions } from '../../components/BackgroundControls/BackgroundControls';

export function Editor() {
  // Estado para os dados do usuário
  const [nome, setNome] = useState('Seu Nome Aqui');
  const [profissao, setProfissao] = useState('Sua Profissão');

  // Estado para o layout do grid
  const [colSizes, setColSizes] = useState<string[]>(['1fr']);
  const [rowSizes, setRowSizes] = useState<string[]>(['1fr']);
  
  // Estado para o design do fundo
  const [background, setBackground] = useState<BackgroundOptions>({
    type: 'gradient',
    solidColor: '#ffffff',
    gradientAngle: 135,
    gradientColors: ['#6a89cc', '#3d3bbe'],
  });

  return (
    <div className={styles.editorContainer}>
      <div className={styles.controlsPanel}>
        <header className={styles.panelHeader}>
          <h1>Construtor de Cartões</h1>
          <p>Crie e personalize seu cartão digital.</p>
        </header>

        <div className={styles.controlSection}>
          <h3>Informações Principais</h3>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="profissao">Profissão</label>
            <input
              type="text"
              id="profissao"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.controlSection}>
          <h3>Layout do Grid</h3>
          <GridControls 
            colSizes={colSizes}
            setColSizes={setColSizes}
            rowSizes={rowSizes}
            setRowSizes={setRowSizes}
          />
        </div>

        <div className={styles.controlSection}>
          <h3>Design do Fundo</h3>
          <BackgroundControls 
            background={background}
            setBackground={setBackground}
          />
        </div>
      </div>

      <div className={styles.previewPanel}>
        <h2>Pré-visualização</h2>
        <div className={styles.cardPreviewWrapper}>
          <Card 
            nome={nome} 
            profissao={profissao}
            colSizes={colSizes}
            rowSizes={rowSizes}
            background={background}
          />
        </div>
      </div>
    </div>
  );
}