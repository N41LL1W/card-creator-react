// src/components/LayerPanel/LayerPanel.tsx
import styles from './LayerPanel.module.css';
import type { Layer } from '../../types';

interface LayerPanelProps {
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
  selectedLayerId: number | null;
  setSelectedLayerId: (id: number | null) => void;
}

export function LayerPanel({ layers, setLayers, selectedLayerId, setSelectedLayerId }: LayerPanelProps) {
  
  const toggleVisibility = (id: number) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('layerIndex', index.toString());
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData('layerIndex'));
    const newLayers = [...layers];
    const [draggedItem] = newLayers.splice(dragIndex, 1);
    newLayers.splice(dropIndex, 0, draggedItem);
    setLayers(newLayers);
  };

  const addLayer = () => {
    const newLayer: Layer = {
      id: Date.now(),
      name: `Sobreposição ${layers.filter(l => l.type === 'overlay').length + 1}`,
      type: 'overlay',
      visible: true,
      options: {
        type: 'solid', // Padrão
        solidColor: '#000000',
        solidOpacity: 0.3
      }
    };
    // Adiciona a nova camada logo acima do fundo (na segunda posição do array)
    const newLayers = [...layers];
    newLayers.splice(1, 0, newLayer);
    setLayers(newLayers);
  };

  return (
    <div className={styles.panel}>
      <h3>Camadas</h3>
      <p className={styles.description}>A camada de cima fica na frente. Arraste para reordenar.</p>
      <div className={styles.layerList} onDragOver={(e) => e.preventDefault()}>
        {/* Usamos .slice().reverse() para mostrar a camada do topo primeiro na lista */}
        {layers.slice().reverse().map((layer, reverseIndex) => {
          const originalIndex = layers.length - 1 - reverseIndex;
          const isActive = layer.id === selectedLayerId;
          
          return (
            <div 
              key={layer.id} 
              className={`${styles.layerItem} ${isActive ? styles.active : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, originalIndex)}
              onDrop={(e) => handleDrop(e, originalIndex)}
            >
              <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
              <div className={styles.layerName} onClick={() => setSelectedLayerId(layer.id)}>
                <i className={`fas ${layer.type === 'background' ? 'fa-palette' : layer.type === 'widget-grid' ? 'fa-th-large' : 'fa-layer-group'}`}></i>
                <span>{layer.name}</span>
              </div>
              <button onClick={() => toggleVisibility(layer.id)} className={layer.visible ? styles.visible : ''} title={layer.visible ? "Ocultar Camada" : "Mostrar Camada"}>
                <i className={`fas ${layer.visible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
          )
        })}
      </div>
      <button onClick={addLayer} className={styles.addButton}>+ Adicionar Camada de Sobreposição</button>
    </div>
  );
}