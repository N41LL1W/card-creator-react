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
    const normalVal = prop === 'fontWeight' ? 'normal' : 'none';
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
        <label>Conteúdo</label>
        <input 
          type="text" 
          value={widget.content} 
          onChange={(e) => onContentChange(widget.id, e.target.value)}
        />
      </div>

      {isTextWidget && (
        <div className={styles.styleControls}>
          <div className={styles.controlGroup}>
            <input type="color" value={widget.styles.color} onChange={(e) => handleStyleChange('color', e.target.value)} />
            <input type="number" value={parseInt(widget.styles.fontSize)} onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)} />
          </div>
          <div className={styles.buttonGroup}>
            <button className={widget.styles.fontWeight === 'bold' ? styles.active : ''} onClick={() => toggleStyle('fontWeight')}><b>B</b></button>
            <button className={widget.styles.fontStyle === 'italic' ? styles.active : ''} onClick={() => toggleStyle('fontStyle')}><i>I</i></button>
            <button className={widget.styles.textDecoration === 'underline' ? styles.active : ''} onClick={() => toggleStyle('textDecoration')}><u>U</u></button>
          </div>
          <div className={styles.buttonGroup}>
            <button className={widget.styles.textAlign === 'left' ? styles.active : ''} onClick={() => handleStyleChange('textAlign', 'left')}>L</button>
            <button className={widget.styles.textAlign === 'center' ? styles.active : ''} onClick={() => handleStyleChange('textAlign', 'center')}>C</button>
            <button className={widget.styles.textAlign === 'right' ? styles.active : ''} onClick={() => handleStyleChange('textAlign', 'right')}>R</button>
          </div>
        </div>
      )}
    </div>
  );
}