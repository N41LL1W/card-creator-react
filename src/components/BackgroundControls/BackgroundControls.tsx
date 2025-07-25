// src/components/BackgroundControls/BackgroundControls.tsx
import styles from './BackgroundControls.module.css';

// Usando a mesma estrutura de tipo do Overlay para consistência
export interface GradientColorStop {
  color: string;
  opacity: number;
}

export interface BackgroundOptions {
  type: 'solid' | 'gradient';
  solidColor: string;
  solidOpacity: number;
  gradientAngle: number;
  gradientColors: GradientColorStop[]; // CORREÇÃO: Agora é um array de objetos
}

interface BackgroundControlsProps {
  background: BackgroundOptions;
  setBackground: (options: BackgroundOptions) => void;
}

export function BackgroundControls({ background, setBackground }: BackgroundControlsProps) {
  
  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...background.gradientColors];
    newColors[index] = { ...newColors[index], color: newColor };
    setBackground({ ...background, gradientColors: newColors });
  };
  
  const handleOpacityChange = (index: number, newOpacity: string) => {
    const newColors = [...background.gradientColors];
    newColors[index] = { ...newColors[index], opacity: parseFloat(newOpacity) };
    setBackground({ ...background, gradientColors: newColors });
  };
  
  const addColor = () => {
    setBackground({
      ...background,
      gradientColors: [...background.gradientColors, { color: '#ffffff', opacity: 1.0 }]
    });
  };

  const removeColor = (index: number) => {
    if (background.gradientColors.length <= 2) {
      alert('O gradiente precisa de pelo menos 2 cores.');
      return;
    }
    setBackground({
      ...background,
      gradientColors: background.gradientColors.filter((_, i) => i !== index)
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="bg-type">Tipo de Fundo</label>
        <select id="bg-type" value={background.type} onChange={(e) => setBackground({...background, type: e.target.value as 'solid' | 'gradient'})}>
          <option value="solid">Cor Sólida</option>
          <option value="gradient">Gradiente</option>
        </select>
      </div>

      {background.type === 'solid' && (
        <div className={styles.formGroup}>
          <label>Cor e Opacidade</label>
          <div className={styles.colorControlGroup}>
            <input type="color" value={background.solidColor} onChange={(e) => setBackground({...background, solidColor: e.target.value})} />
            <input type="range" min="0" max="1" step="0.01" value={background.solidOpacity} onChange={(e) => setBackground({...background, solidOpacity: parseFloat(e.target.value)})} />
          </div>
        </div>
      )}

      {background.type === 'gradient' && (
        <>
          <div className={styles.formGroup}>
            <label>Ângulo ({background.gradientAngle}°)</label>
            <input type="range" min="0" max="360" value={background.gradientAngle} onChange={(e) => setBackground({...background, gradientAngle: parseInt(e.target.value, 10)})} />
          </div>
          <div className={styles.formGroup}>
            <label>Cores</label>
            {background.gradientColors.map((stop, index) => (
              <div key={index} className={styles.colorControlGroup}>
                <input type="color" value={stop.color} onChange={(e) => handleColorChange(index, e.target.value)} />
                <input type="range" min="0" max="1" step="0.01" value={stop.opacity} onChange={(e) => handleOpacityChange(index, e.target.value)} />
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