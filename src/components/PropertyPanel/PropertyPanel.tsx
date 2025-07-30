// src/components/PropertyPanel/PropertyPanel.tsx
import styles from './PropertyPanel.module.css';
import type { Layer, Widget, WidgetStyles } from '../../types';
import { GridControls } from '../GridControls/GridControls';
import { BackgroundControls } from '../BackgroundControls/BackgroundControls';

interface PropertyPanelProps {
  layer: Layer | null;
  updateLayer: (layerId: number, newOptions: Partial<Layer['options']>) => void;
  updateWidget: (widget: Widget) => void;
  onAddWidget: (type: Widget['type'], label: string) => void;
}

export function PropertyPanel({ layer, updateLayer, updateWidget, onAddWidget }: PropertyPanelProps) {
  if (!layer) {
    return <div className={styles.panel}><p className={styles.placeholder}>Selecione uma camada na lista para editar.</p></div>;
  }

  const handleWidgetStyleChange = (widget: Widget, prop: keyof WidgetStyles, value: any) => {
    updateWidget({ ...widget, styles: { ...widget.styles, [prop]: value } });
  };
  const toggleWidgetStyle = (widget: Widget, prop: 'fontWeight' | 'fontStyle' | 'textDecoration') => {
    const activeVal = prop === 'fontWeight' ? 'bold' : prop === 'fontStyle' ? 'italic' : 'underline';
    const normalVal = (prop === 'fontWeight' || prop === 'fontStyle') ? 'normal' : 'none';
    const newStyle = widget.styles[prop] === activeVal ? normalVal : activeVal;
    handleWidgetStyleChange(widget, prop, newStyle);
  };
  const handleWidgetContentChange = (widget: Widget, newContent: string) => {
    updateWidget({ ...widget, content: newContent });
  };
  const handleWidgetDelete = (widgetId: number) => {
    if (layer.options.widgets) {
      const updatedWidgets = layer.options.widgets.filter(w => w.id !== widgetId);
      updateLayer(layer.id, { widgets: updatedWidgets });
    }
  };

  return (
    <div className={styles.panel}>
      <h3>Propriedades de "{layer.name}"</h3>
      
      {(layer.type === 'background' || layer.type === 'overlay') && (
        <BackgroundControls 
          options={layer.options}
          onUpdate={(newOptions) => updateLayer(layer.id, newOptions)}
        />
      )}

      {layer.type === 'widget-grid' && (
        <>
          <GridControls 
            colSizes={layer.options.colSizes || []}
            rowSizes={layer.options.rowSizes || []}
            onUpdate={(updates) => updateLayer(layer.id, updates)}
          />
          <hr className={styles.hr} />
          <h4>Elementos nesta Camada</h4>
          
          {(layer.options.widgets || []).map(widget => (
            <div key={widget.id} className={styles.widgetControlBlock}>
              <header 
                className={styles.header} 
                draggable 
                onDragStart={(e) => e.dataTransfer.setData('widgetId', widget.id.toString())}
              >
                <h4><i className="fas fa-grip-vertical"></i> {widget.label}</h4>
                <button onClick={() => handleWidgetDelete(widget.id)} className={styles.deleteButton}>×</button>
              </header>
              <div className={styles.contentInput}>
                <label>{widget.type === 'texto' ? 'Conteúdo' : 'URL da Imagem'}</label>
                <input type="text" value={widget.content} onChange={(e) => handleWidgetContentChange(widget, e.target.value)} />
              </div>
              {widget.type === 'texto' && (
                <div className={styles.styleControls}>
                   <div className={styles.controlGroup}>
                      <label>Fonte e Cor</label>
                      <div className={styles.inlineInputs}>
                        <select value={widget.styles.fontFamily} onChange={(e) => handleWidgetStyleChange(widget, 'fontFamily', e.target.value)}>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Verdana, sans-serif">Verdana</option>
                        </select>
                        <input type="color" value={widget.styles.color} onChange={(e) => handleWidgetStyleChange(widget, 'color', e.target.value)} />
                      </div>
                   </div>
                   <div className={styles.controlGroup}>
                      <label>Tamanho e Estilos</label>
                      <div className={styles.inlineInputs}>
                        <input type="number" value={parseInt(widget.styles.fontSize)} onChange={(e) => handleWidgetStyleChange(widget, 'fontSize', `${e.target.value}px`)} />
                        <span>px</span>
                        <div className={styles.buttonGroup}>
                            <button className={widget.styles.fontWeight === 'bold' ? styles.active : ''} onClick={() => toggleWidgetStyle(widget, 'fontWeight')}>B</button>
                            <button className={widget.styles.fontStyle === 'italic' ? styles.active : ''} onClick={() => toggleWidgetStyle(widget, 'fontStyle')}>I</button>
                            <button className={widget.styles.textDecoration === 'underline' ? styles.active : ''} onClick={() => toggleWidgetStyle(widget, 'textDecoration')}>U</button>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          ))}
          
           <div className={styles.dropdown}>
              <button type="button" className={styles.addButton} onClick={() => {
                const label = prompt("Qual o nome deste novo elemento de texto?\n(Ex: Slogan, Telefone, Endereço)");
                if (label) onAddWidget('texto', label);
              }}>
                  <i className="fas fa-plus"></i> Adicionar Texto
              </button>
              <button type="button" className={styles.addButton} onClick={() => {
                const label = prompt("Qual o nome deste novo elemento de imagem?\n(Ex: Logo, Ícone, QR Code)");
                if (label) onAddWidget('imagem', label);
              }}>
                  <i className="fas fa-plus"></i> Adicionar Imagem
              </button>
          </div>
        </>
      )}
    </div>
  );
}