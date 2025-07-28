// src/components/LayerPanel/LayerPanel.tsx
import styles from './LayerPanel.module.css';
import type { Layer } from '../../types';

interface LayerPanelProps {
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
}

export function LayerPanel({ layers, setLayers }: LayerPanelProps) {
  const toggleVisibility = (id: number) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  // Funções para reordenar camadas (drag and drop)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('layerIndex', index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData('layerIndex'));
    const draggedItem = layers[dragIndex];
    const newLayers = [...layers];
    newLayers.splice(dragIndex, 1);
    newLayers.splice(dropIndex, 0, draggedItem);
    setLayers(newLayers);
  };

  return (
    <div className={styles.panel}>
      <h3>Camadas</h3>
      <p className={styles.description}>A camada de cima fica na frente. Arraste para reordenar.</p>
      <div className={styles.layerList}>
        {/* Usamos .slice().reverse() para mostrar a camada do topo primeiro */}
        {layers.slice().reverse().map((layer, reverseIndex) => {
          const originalIndex = layers.length - 1 - reverseIndex;
          return (
            <div 
              key={layer.id} 
              className={styles.layerItem}
              draggable
              onDragStart={(e) => handleDragStart(e, originalIndex)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, originalIndex)}
            >
              <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
              <span className={styles.layerName}>
                <i className={`fas ${layer.type === 'background' ? 'fa-palette' : 'fa-th'}`}></i>
                {layer.name}
              </span>
              <button onClick={() => toggleVisibility(layer.id)} className={layer.visible ? styles.visible : ''}>
                <i className={`fas ${layer.visible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}