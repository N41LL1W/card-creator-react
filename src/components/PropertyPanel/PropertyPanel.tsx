// src/components/PropertyPanel/PropertyPanel.tsx
import styles from './PropertyPanel.module.css';
import type { Layer, Widget, WidgetStyles } from '../../types';
import { GridControls } from '../GridControls/GridControls';
import { BackgroundControls } from '../BackgroundControls/BackgroundControls';

interface PropertyPanelProps {
  layer: Layer | null;
  updateLayer: (layerId: number, newOptions: Partial<Layer['options']>) => void;
  updateWidget: (widget: Widget) => void;
  onAddWidget: (type: Widget['type']) => void;
}

export function PropertyPanel({ layer, updateLayer, updateWidget, onAddWidget }: PropertyPanelProps) {
  if (!layer) {
    return <div className={styles.panel}><p className={styles.placeholder}>Selecione uma camada na lista para editar suas propriedades.</p></div>;
  }

  // --- Funções de Manipulação de Widget ---
  const handleWidgetStyleChange = (widget: Widget, prop: keyof WidgetStyles, value: string) => {
    const newStyles = { ...widget.styles, [prop]: value };
    updateWidget({ ...widget, styles: newStyles });
  };
  const toggleWidgetStyle = (widget: Widget, prop: 'fontWeight' | 'fontStyle' | 'textDecoration') => {
    const currentVal = widget.styles[prop];
    const normalVal = (prop === 'fontWeight' || prop === 'fontStyle') ? 'normal' : 'none';
    const activeVal = prop === 'fontWeight' ? 'bold' : prop === 'fontStyle' ? 'italic' : 'underline';
    const newStyles = { ...widget.styles, [prop]: currentVal === activeVal ? normalVal : activeVal };
    updateWidget({ ...widget, styles: newStyles });
  };
  const handleWidgetContentChange = (widget: Widget, newContent: string) => {
    updateWidget({ ...widget, content: newContent });
  };
  const handleWidgetDelete = (widgetId: number) => {
    const updatedWidgets = layer.options.widgets?.filter(w => w.id !== widgetId);
    updateLayer(layer.id, { widgets: updatedWidgets });
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
          
          {(layer.options.widgets || []).map(widget => {
            const isTextWidget = ['nome', 'profissao', 'contato', 'endereco'].includes(widget.type);
            return (
              <div key={widget.id} className={styles.widgetControlBlock}>
                <header className={styles.header}>
                  <h4>{widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}</h4>
                  <button onClick={() => handleWidgetDelete(widget.id)} className={styles.deleteButton}>×</button>
                </header>
                <div className={styles.contentInput}>
                  <label>{isTextWidget ? 'Conteúdo' : 'URL da Imagem'}</label>
                  <input type="text" value={widget.content} onChange={(e) => handleWidgetContentChange(widget, e.target.value)} />
                </div>
                {isTextWidget && (
                  <div className={styles.styleControls}>
                     <div className={styles.controlGroup}>
                        <label>Fonte</label>
                        <select value={widget.styles.fontFamily} onChange={(e) => handleWidgetStyleChange(widget, 'fontFamily', e.target.value)}>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Verdana, sans-serif">Verdana</option>
                            <option value="'Times New Roman', serif">Times New Roman</option>
                        </select>
                     </div>
                     <div className={styles.controlGroup}>
                        <label>Cor e Tamanho</label>
                        <div className={styles.inlineInputs}>
                            <input type="color" value={widget.styles.color} onChange={(e) => handleWidgetStyleChange(widget, 'color', e.target.value)} />
                            <input type="number" value={parseInt(widget.styles.fontSize)} onChange={(e) => handleWidgetStyleChange(widget, 'fontSize', `${e.target.value}px`)} />
                            <span>px</span>
                        </div>
                     </div>
                     <div className={styles.controlGroup}>
                        <label>Estilos</label>
                        <div className={styles.buttonGroup}>
                            <button className={widget.styles.fontWeight === 'bold' ? styles.active : ''} onClick={() => toggleWidgetStyle(widget, 'fontWeight')}><b>B</b></button>
                            <button className={widget.styles.fontStyle === 'italic' ? styles.active : ''} onClick={() => toggleWidgetStyle(widget, 'fontStyle')}><i>I</i></button>
                            <button className={widget.styles.textDecoration === 'underline' ? styles.active : ''} onClick={() => toggleWidgetStyle(widget, 'textDecoration')}><u>U</u></button>
                        </div>
                     </div>
                      <div className={styles.controlGroup}>
                        <label>Alinhamento</label>
                        <div className={styles.buttonGroup}>
                            <button className={widget.styles.textAlign === 'left' ? styles.active : ''} onClick={() => handleWidgetStyleChange(widget, 'textAlign', 'left')}><i className="fas fa-align-left"></i></button>
                            <button className={widget.styles.textAlign === 'center' ? styles.active : ''} onClick={() => handleWidgetStyleChange(widget, 'textAlign', 'center')}><i className="fas fa-align-center"></i></button>
                            <button className={widget.styles.textAlign === 'right' ? styles.active : ''} onClick={() => handleWidgetStyleChange(widget, 'textAlign', 'right')}><i className="fas fa-align-right"></i></button>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            )
          })}
          
           <div className={styles.dropdown}>
              <button type="button" className={styles.addButton} onClick={() => onAddWidget('nome')}>
                  <i className="fas fa-plus"></i> Adicionar Elemento
              </button>
          </div>
        </>
      )}
    </div>
  );
}