// src/components/WidgetPanel/WidgetPanel.tsx
import styles from './WidgetPanel.module.css';

const availableWidgets = [
  { type: 'nome', label: 'Nome', icon: 'fa-font' },
  { type: 'profissao', label: 'Profissão', icon: 'fa-briefcase' },
  { type: 'contato', label: 'Contato', icon: 'fa-phone' },
  { type: 'endereco', label: 'Endereço', icon: 'fa-map-marker-alt' },
  { type: 'logo', label: 'Logo (Imagem)', icon: 'fa-image' },
  { type: 'qrcode', label: 'QR Code (Imagem)', icon: 'fa-qrcode' },
];

export function WidgetPanel() {
  const handleDragStart = (e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData('widgetType', widgetType);
  };

  return (
    <div className={styles.panel}>
      {availableWidgets.map(widget => (
        <div 
          key={widget.type}
          className={styles.widgetItem}
          draggable
          onDragStart={(e) => handleDragStart(e, widget.type)}
        >
          <i className={`fas ${widget.icon}`}></i>
          <span>{widget.label}</span>
        </div>
      ))}
    </div>
  );
}