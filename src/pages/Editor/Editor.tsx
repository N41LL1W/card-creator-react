// src/pages/Editor/Editor.tsx
import { useState } from 'react';
import styles from './Editor.module.css';
import { Card } from '../../components/Card/Card';
import { LayerPanel } from '../../components/LayerPanel/LayerPanel';
import { PropertyPanel } from '../../components/PropertyPanel/PropertyPanel';
import type { Layer, Widget } from '../../types';

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
      id: 2, name: 'Conteúdo Principal', type: 'widget-grid', visible: true,
      options: {
        type: 'grid',
        colSizes: ['1fr'], rowSizes: ['1fr'],
        widgets: [
          { id: 101, type: 'nome', content: 'Seu Nome Aqui', gridCell: 0, styles: { color: '#ffffff', fontSize: '28px', fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }},
          { id: 102, type: 'profissao', content: 'Sua Profissão', gridCell: 0, styles: { color: '#ffffff', fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }},
        ],
      }
    }
  ]);

  const [selectedLayerId, setSelectedLayerId] = useState<number | null>(1);
  const selectedLayer = layers.find(l => l.id === selectedLayerId) || null;

  const updateLayer = (layerId: number, newOptions: Partial<Layer['options']>) => {
    setLayers(layers.map(l => 
      l.id === layerId ? { ...l, options: { ...l.options, ...newOptions } } : l
    ));
  };

  const addWidget = (widgetType: Widget['type']) => {
      const gridLayer = layers.find(l => l.type === 'widget-grid');
      if (!gridLayer) return;

      const currentWidgets = gridLayer.options.widgets || [];
      const widgetExistente = currentWidgets.find(w => w.type === widgetType);

      if (widgetExistente) {
          alert(`O elemento "${widgetType}" já existe.`);
          setSelectedLayerId(gridLayer.id);
          return;
      }
      
      const novoWidget: Widget = {
          id: Date.now(),
          type: widgetType,
          content: '',
          gridCell: -1,
          styles: { color: '#333333', fontSize: '16px', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', fontFamily: 'Arial, sans-serif' }
      };

      updateLayer(gridLayer.id, { widgets: [...currentWidgets, novoWidget] });
      setSelectedLayerId(gridLayer.id);
  };

  const updateWidget = (updatedWidget: Widget) => {
    setLayers(layers.map(layer => {
      if (layer.type === 'widget-grid' && layer.options.widgets) {
        return {
          ...layer,
          options: {
            ...layer.options,
            widgets: layer.options.widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w)
          }
        }
      }
      return layer;
    }));
  };

  const handleDropOnCard = (cellIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    const widgetId = e.dataTransfer.getData('widgetId');
    if (!widgetId) return;

    const gridLayer = layers.find(l => l.type === 'widget-grid');
    if (!gridLayer || !gridLayer.options.widgets) return;

    const widget = gridLayer.options.widgets.find(w => w.id === parseInt(widgetId));
    
    if(widget) {
        updateWidget({ ...widget, gridCell: cellIndex });
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.controlsPanel}>
        <header className={styles.panelHeader}>
          <h1>Editor de Cartão</h1>
          <p>Gerencie as camadas e o conteúdo do seu cartão.</p>
        </header>
        <div className={styles.panelsWrapper}>
            <LayerPanel 
                layers={layers} 
                setLayers={setLayers}
                selectedLayerId={selectedLayerId}
                setSelectedLayerId={setSelectedLayerId}
            />
            <PropertyPanel
                layer={selectedLayer}
                updateLayer={updateLayer}
                updateWidget={updateWidget}
                onAddWidget={addWidget}
            />
        </div>
      </div>
      <div className={styles.previewPanel}>
        <h2>Pré-visualização</h2>
        <div className={styles.cardPreviewWrapper}>
          <Card 
            layers={layers}
            onDrop={handleDropOnCard}
          />
        </div>
      </div>
    </div>
  );
}