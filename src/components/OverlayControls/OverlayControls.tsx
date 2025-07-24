// src/components/OverlayControls/OverlayControls.tsx
import styles from './OverlayControls.module.css';

export interface GradientColorStop {
  color: string;
  opacity: number; // Garante que a opacidade seja um número
}

export interface OverlayOptions {
  isActive: boolean;
  type: 'solid' | 'gradient';
  solidColor: string;
  solidOpacity: number; // Garante que a opacidade seja um número
  gradientAngle: number;
  gradientColors: GradientColorStop[];
}

interface OverlayControlsProps {
  overlay: OverlayOptions;
  setOverlay: (options: OverlayOptions) => void;
}

export function OverlayControls({ overlay, setOverlay }: OverlayControlsProps) {
  
  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...overlay.gradientColors];
    newColors[index] = { ...newColors[index], color: newColor };
    setOverlay({ ...overlay, gradientColors: newColors });
  };
  
  const handleOpacityChange = (index: number, newOpacity: string) => {
    const newColors = [...overlay.gradientColors];
    // CORREÇÃO: Converte a string para número AQUI
    newColors[index] = { ...newColors[index], opacity: parseFloat(newOpacity) };
    setOverlay({ ...overlay, gradientColors: newColors });
  };
  
  const addColor = () => {
    setOverlay({
      ...overlay,
      gradientColors: [...overlay.gradientColors, { color: '#ffffff', opacity: 0.5 }]
    });
  };

  const removeColor = (index: number) => {
    if (overlay.gradientColors.length <= 2) {
      alert('O gradiente precisa de pelo menos 2 cores.');
      return;
    }
    setOverlay({
      ...overlay,
      gradientColors: overlay.gradientColors.filter((_, i) => i !== index)
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleGroup}>
        <input 
          type="checkbox" 
          id="overlay-active" 
          checked={overlay.isActive}
          onChange={(e) => setOverlay({ ...overlay, isActive: e.target.checked })}
        />
        <label htmlFor="overlay-active">Ativar Sobreposição de Cor</label>
      </div>

      {overlay.isActive && (
        <div className={styles.controlsWrapper}>
          <div className={styles.formGroup}>
            <label htmlFor="overlay-type">Tipo</label>
            <select id="overlay-type" value={overlay.type} onChange={(e) => setOverlay({...overlay, type: e.target.value as 'solid' | 'gradient'})}>
              <option value="solid">Cor Sólida</option>
              <option value="gradient">Gradiente</option>
            </select>
          </div>

          {overlay.type === 'solid' && (
            <div className={styles.formGroup}>
              <label>Cor e Opacidade</label>
              <div className={styles.colorControlGroup}>
                <input type="color" value={overlay.solidColor} onChange={(e) => setOverlay({...overlay, solidColor: e.target.value})} />
                {/* CORREÇÃO: Converte a string para número AQUI */}
                <input type="range" min="0" max="1" step="0.01" value={overlay.solidOpacity} onChange={(e) => setOverlay({...overlay, solidOpacity: parseFloat(e.target.value)})} />
              </div>
            </div>
          )}

          {overlay.type === 'gradient' && (
            <>
              <div className={styles.formGroup}>
                <label>Ângulo ({overlay.gradientAngle}°)</label>
                {/* CORREÇÃO: Converte a string para número AQUI */}
                <input type="range" min="0" max="360" value={overlay.gradientAngle} onChange={(e) => setOverlay({...overlay, gradientAngle: parseInt(e.target.value, 10)})} />
              </div>
              <div className={styles.formGroup}>
                <label>Cores</label>
                {overlay.gradientColors.map((stop, index) => (
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
      )}
    </div>
  );
}