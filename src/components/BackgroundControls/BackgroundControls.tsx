// src/components/BackgroundControls/BackgroundControls.tsx
import styles from './BackgroundControls.module.css';
import type { LayerOptions, GradientColorStop } from '../../types'; // Importa os tipos corretos

interface BackgroundControlsProps {
  options: LayerOptions;
  onUpdate: (newOptions: Partial<LayerOptions>) => void;
}

export function BackgroundControls({ options, onUpdate }: BackgroundControlsProps) {
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ type: e.target.value as 'solid' | 'gradient' });
  };

  const handleSolidColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ solidColor: e.target.value });
  };

  const handleSolidOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ solidOpacity: parseFloat(e.target.value) });
  };

  const handleGradientAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ gradientAngle: parseInt(e.target.value, 10) });
  };

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
          {/* <option value="image">Imagem</option> */} {/* Desabilitado por enquanto */}
        </select>
      </div>

      {options.type === 'solid' && (
        <div className={styles.formGroup}>
          <label>Cor e Opacidade</label>
          <div className={styles.colorControlGroup}>
            <input type="color" value={options.solidColor} onChange={handleSolidColorChange} />
            <input type="range" min="0" max="1" step="0.01" value={options.solidOpacity} onChange={handleSolidOpacityChange} />
          </div>
        </div>
      )}

      {options.type === 'gradient' && (
        <>
          <div className={styles.formGroup}>
            <label>Ângulo ({options.gradientAngle}°)</label>
            <input type="range" min="0" max="360" value={options.gradientAngle} onChange={handleGradientAngleChange} />
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
    </div>
  );
}