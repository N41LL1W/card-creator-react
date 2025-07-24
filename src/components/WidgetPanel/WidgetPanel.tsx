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
  
  const handleDragStart = (e: React.DragEvent, widgetType: string, widgetLabel: string) => {
    // Guarda o TIPO do widget para que o drop saiba o que está sendo adicionado
    e.dataTransfer.setData('widgetType', widgetType);

    // Lógica para criar a pré-visualização de arraste customizada
    const dragPreview = document.getElementById('drag-preview');
    if (dragPreview) {
      // Cria o conteúdo da pré-visualização com ícone e texto
      dragPreview.innerHTML = `<i class="fas ${availableWidgets.find(w => w.type === widgetType)?.icon || 'fa-puzzle-piece'}"></i> Adicionando ${widgetLabel}...`;
      
      // Define a imagem "fantasma" que segue o mouse
      // O navegador tira um "snapshot" do dragPreview neste momento
      // Os valores (15, 15) indicam um pequeno deslocamento para o cursor não ficar exatamente no canto
      e.dataTransfer.setDragImage(dragPreview, 15, 15);
    }
  };

  return (
    <div className={styles.panel}>
      {availableWidgets.map(widget => (
        <div 
          key={widget.type}
          className={styles.widgetItem}
          draggable // Torna o elemento arrastável
          onDragStart={(e) => handleDragStart(e, widget.type, widget.label)}
        >
          <i className={`fas ${widget.icon}`}></i>
          <span>{widget.label}</span>
        </div>
      ))}
    </div>
  );
}