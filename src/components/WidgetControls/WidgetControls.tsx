// src/components/WidgetControls/WidgetControls.tsx
import styles from './WidgetControls.module.css';
import type { Widget, WidgetStyles } from '../../types';

interface WidgetControlsProps {
  widget: Widget;
  onUpdate: (id: number, newStyles: Partial<WidgetStyles>) => void;
  onContentChange: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

export function WidgetControls({ widget, onUpdate, onContentChange, onDelete }: WidgetControlsProps) {
  
  const handleStyleChange = (prop: keyof WidgetStyles, value: string) => {
    onUpdate(widget.id, { [prop]: value });
  };
  
  const toggleStyle = (prop: 'fontWeight' | 'fontStyle' | 'textDecoration') => {
    const currentVal = widget.styles[prop];
    const normalVal = (prop === 'fontWeight' || prop === 'fontStyle') ? 'normal' : 'none';
    const activeVal = prop === 'fontWeight' ? 'bold' : prop === 'fontStyle' ? 'italic' : 'underline';
    onUpdate(widget.id, { [prop]: currentVal === activeVal ? normalVal : activeVal });
  };

  const isTextWidget = ['nome', 'profissao', 'contato', 'endereco'].includes(widget.type);

  return (
    <div className={styles.widgetControlBlock}>
      <header className={styles.header}>
        <h4>{widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}</h4>
        <button onClick={() => onDelete(widget.id)} className={styles.deleteButton}>×</button>
      </header>
      
      <div className={styles.contentInput}>
        <label>{isTextWidget ? 'Conteúdo do Texto' : 'URL da Imagem'}</label>
        <input 
          type="text" 
          value={widget.content} 
          placeholder={isTextWidget ? 'Digite aqui...' : 'https://...'}
          onChange={(e) => onContentChange(widget.id, e.target.value)}
        />
      </div>

      {isTextWidget && (
        <div className={styles.styleControls}>
          <div className={styles.controlGroup}>
            <label>Fonte</label>
            <select value={widget.styles.fontFamily} onChange={(e) => handleStyleChange('fontFamily', e.target.value)}>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Georgia', serif">Georgia</option>
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label>Cor e Tamanho</label>
            <div className={styles.inlineInputs}>
                <input type="color" value={widget.styles.color} onChange={(e) => handleStyleChange('color', e.target.value)} />
                <input type="number" value={parseInt(widget.styles.fontSize)} onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)} />
                <span>px</span>
            </div>
          </div>
          <div className={styles.controlGroup}>
            <label>Estilos</label>
            <div className={styles.buttonGroup}>
                <button className={widget.styles.fontWeight === 'bold' ? styles.active : ''} onClick={() => toggleStyle('fontWeight')}><b>B</b></button>
                <button className={widget.styles.fontStyle === 'italic' ? styles.active : ''} onClick={() => toggleStyle('fontStyle')}><i>I</i></button>
                <button className={widget.styles.textDecoration === 'underline' ? styles.active : ''} onClick={() => toggleStyle('textDecoration')}><u>U</u></button>
            </div>
          </div>
           <div className={styles.controlGroup}>
            <label>Alinhamento</label>
            <div className={styles.buttonGroup}>
                <button className={widget.styles.textAlign === 'left' ? styles.active : ''} onClick={() => handleStyleChange('textAlign', 'left')}><i className="fas fa-align-left"></i></button>
                <button className={widget.styles.textAlign === 'center' ? styles.active : ''} onClick={() => handleStyleChange('textAlign', 'center')}><i className="fas fa-align-center"></i></button>
                <button className={widget.styles.textAlign === 'right' ? styles.active : ''} onClick={() => handleStyleChange('textAlign', 'right')}><i className="fas fa-align-right"></i></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}