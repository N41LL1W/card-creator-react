// src/components/BackgroundControls/BackgroundControls.tsx
import styles from './BackgroundControls.module.css';
import type { LayerOptions, GradientColorStop } from '../../types';

interface BackgroundControlsProps {
  options: LayerOptions;
  onUpdate: (newOptions: Partial<LayerOptions>) => void;
}

export function BackgroundControls({ options, onUpdate }: BackgroundControlsProps) {
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ type: e.target.value as 'solid' | 'gradient' | 'image' });
  };
  
  // Funções para gradiente
  const handleGradientColorChange = (index: number, color: string) => {
    const newColors = [...(options.gradientColors || [])];
    newColors[index] = { ...newColors[index], color: color };
    onUpdate({ gradientColors: newColors });
  };
  const handleGradientOpacityChange = (index: number, opacity: string) => {
    const newColors = [...(options.gradientColors || [])];
    newColors[index] = { ...newColors[index], opacity: parseFloat(opacity) };
    onUpdate({ gradientColors: newColors });
  };
  const addColor = () => {
    const newColor: GradientColorStop = { color: '#ffffff', opacity: 1.0 };
    onUpdate({ gradientColors: [...(options.gradientColors || []), newColor] });
  };
  const removeColor = (index: number) => {
    if (options.gradientColors && options.gradientColors.length > 2) {
      onUpdate({ gradientColors: options.gradientColors.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="bg-type">Tipo</label>
        <select id="bg-type" value={options.type} onChange={handleTypeChange}>
          <option value="solid">Cor Sólida</option>
          <option value="gradient">Gradiente</option>
          <option value="image">Imagem</option>
        </select>
      </div>

      {options.type === 'solid' && (
        <div className={styles.formGroup}>
          <label>Cor e Opacidade</label>
          <div className={styles.colorControlGroup}>
            <input type="color" value={options.solidColor || '#ffffff'} onChange={(e) => onUpdate({ solidColor: e.target.value })} />
            <input type="range" min="0" max="1" step="0.01" value={options.solidOpacity || 1} onChange={(e) => onUpdate({ solidOpacity: parseFloat(e.target.value) })} />
          </div>
        </div>
      )}

      {options.type === 'gradient' && (
        <>
          <div className={styles.formGroup}>
            <label>Ângulo ({options.gradientAngle || 135}°)</label>
            <input type="range" min="0" max="360" value={options.gradientAngle || 135} onChange={(e) => onUpdate({ gradientAngle: parseInt(e.target.value, 10)})} />
          </div>
          <div className={styles.formGroup}>
            <label>Cores</label>
            {(options.gradientColors || []).map((stop, index) => (
              <div key={index} className={styles.colorControlGroup}>
                <input type="color" value={stop.color} onChange={(e) => handleGradientColorChange(index, e.target.value)} />
                <input type="range" min="0" max="1" step="0.01" value={stop.opacity} onChange={(e) => handleGradientOpacityChange(index, e.target.value)} />
                <button onClick={() => removeColor(index)} className={styles.removeButton}>×</button>
              </div>
            ))}
            <button onClick={addColor} className={styles.addButton}>+ Adicionar Cor</button>
          </div>
        </>
      )}

      {options.type === 'image' && (
        <>
            <div className={styles.formGroup}>
                <label>URL da Imagem</label>
                <input type="text" value={options.imageUrl || ''} onChange={(e) => onUpdate({ imageUrl: e.target.value })} placeholder="https://exemplo.com/imagem.png"/>
            </div>
            <div className={styles.formGroup}>
                <label>Opacidade da Camada ({Math.round((options.imageOpacity || 1) * 100)}%)</label>
                <input type="range" min="0" max="1" step="0.01" value={options.imageOpacity || 1} onChange={(e) => onUpdate({ imageOpacity: parseFloat(e.target.value)})} />
            </div>
        </>
      )}
    </div>
  );
}