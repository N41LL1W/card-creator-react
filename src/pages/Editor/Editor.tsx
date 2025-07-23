// src/pages/Editor/Editor.tsx
import { useState } from 'react';
import styles from './Editor.module.css';
import { Card } from '../../components/Card/Card';
import { GridControls } from '../../components/GridControls/GridControls';
import type { BackgroundOptions } from '../../components/BackgroundControls/BackgroundControls';
import { BackgroundControls } from '../../components/BackgroundControls/BackgroundControls';
import { WidgetPanel } from '../../components/WidgetPanel/WidgetPanel';
import { WidgetControls } from '../../components/WidgetControls/WidgetControls';
import type { Widget, WidgetStyles } from '../../types';

export function Editor() {
  // --- ESTADO DA APLICAÇÃO ---
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 1, type: 'nome', content: 'Seu Nome Aqui', gridCell: 0, styles: { color: '#ffffff', fontSize: '28px', fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }},
    { id: 2, type: 'profissao', content: 'Sua Profissão', gridCell: 0, styles: { color: '#ffffff', fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }},
  ]);
  const [colSizes, setColSizes] = useState<string[]>(['1fr']);
  const [rowSizes, setRowSizes] = useState<string[]>(['1fr']);
  const [background, setBackground] = useState<BackgroundOptions>({ type: 'gradient', solidColor: '#ffffff', gradientAngle: 135, gradientColors: ['#6a89cc', '#3d3bbe'] });

  // --- FUNÇÕES DE MANIPULAÇÃO DE ESTADO ---
  const handleDropOnCard = (cellIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData('widgetType') as Widget['type'];
    const draggedWidgetId = e.dataTransfer.getData('widgetId');

    if (draggedWidgetId) {
      setWidgets(prev => prev.map(w => w.id === parseInt(draggedWidgetId) ? { ...w, gridCell: cellIndex } : w));
    } else if (widgetType) {
      const widgetExistente = widgets.find(w => w.type === widgetType);
      if (widgetExistente) {
        setWidgets(prev => prev.map(w => w.type === widgetType ? { ...w, gridCell: cellIndex } : w));
      } else {
        const novoWidget: Widget = {
          id: Date.now(), type: widgetType, content: `[${widgetType}]`, gridCell: cellIndex,
          styles: { color: '#333333', fontSize: '16px', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }
        };
        setWidgets(prev => [...prev, novoWidget]);
      }
    }
  };

  const handleWidgetContentChange = (id: number, newContent: string) => { setWidgets(prev => prev.map(w => w.id === id ? { ...w, content: newContent } : w)); };
  const handleWidgetStyleChange = (id: number, newStyles: Partial<WidgetStyles>) => { setWidgets(prev => prev.map(w => w.id === id ? { ...w, styles: { ...w.styles, ...newStyles } } : w)); };
  const handleWidgetDelete = (id: number) => { setWidgets(prev => prev.filter(w => w.id !== id)); };

  // --- FUNÇÕES DE I/O (SALVAR, CARREGAR, GERAR) ---
  const handleSaveState = () => {
    const appState = { widgets, colSizes, rowSizes, background };
    const dataStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'meu_cartao_config.json'; a.click(); URL.revokeObjectURL(url);
  };

  const handleLoadState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedState = JSON.parse(e.target?.result as string);
        setWidgets(loadedState.widgets || []);
        setColSizes(loadedState.colSizes || ['1fr']);
        setRowSizes(loadedState.rowSizes || ['1fr']);
        setBackground(loadedState.background || { type: 'solid', solidColor: '#ffffff', gradientAngle: 135, gradientColors: ['#ffffff', '#000000'] });
        alert('Configuração carregada com sucesso!');
      } catch (error) { alert('Erro ao carregar o arquivo.'); }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleGenerateCard = () => {
    const finalState = { widgets, colSizes, rowSizes, background };
    const data = encodeURIComponent(JSON.stringify(finalState));
    window.open(`/cartao.html?data=${data}`, '_blank');
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.controlsPanel}>
        <header className={styles.panelHeader}>
          <h1>Construtor de Cartões</h1>
          <p>Crie e personalize seu cartão digital.</p>
          <div className={styles.ioButtons}>
            <button onClick={handleSaveState}>Salvar Configuração</button>
            <label htmlFor="loadFile" className={styles.loadButton}>Carregar Configuração</label>
            <input type="file" id="loadFile" accept=".json" onChange={handleLoadState} style={{ display: 'none' }} />
          </div>
        </header>

        <div className={styles.controlSection}>
          <h3>Elementos</h3>
          <p>Arraste para a pré-visualização. Configure abaixo.</p>
          <WidgetPanel />
        </div>
        
        <div className={styles.controlSection}>
          <h3>Configuração dos Elementos</h3>
          {widgets.length > 0 ? (
            widgets.map(widget => (
              <WidgetControls 
                key={widget.id}
                widget={widget}
                onUpdate={handleWidgetStyleChange}          // <--- NOME CORRETO
                onContentChange={handleWidgetContentChange} // <--- NOME CORRETO
                onDelete={handleWidgetDelete}
              />
            ))
          ) : ( <p className={styles.placeholderText}>Adicione um elemento para configurá-lo.</p> )}
        </div>
        
        <div className={styles.controlSection}>
          <h3>Layout do Grid</h3>
          <GridControls colSizes={colSizes} setColSizes={setColSizes} rowSizes={rowSizes} setRowSizes={setRowSizes} />
        </div>

        <div className={styles.controlSection}>
          <h3>Design do Fundo</h3>
          <BackgroundControls background={background} setBackground={setBackground} />
        </div>

        <button onClick={handleGenerateCard} className={styles.generateButton}>
          Gerar Cartão Final
        </button>
      </div>
      <div className={styles.previewPanel}>
        <h2>Pré-visualização</h2>
        <div className={styles.cardPreviewWrapper}>
          <Card widgets={widgets} colSizes={colSizes} rowSizes={rowSizes} background={background} onDrop={handleDropOnCard} />
        </div>
      </div>
    </div>
  );
}