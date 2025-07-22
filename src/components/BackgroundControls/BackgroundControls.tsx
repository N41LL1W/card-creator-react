// src/components/BackgroundControls/BackgroundControls.tsx
import styles from './BackgroundControls.module.css';

export interface BackgroundOptions {
  type: 'solid' | 'gradient';
  solidColor: string;
  gradientAngle: number;
  gradientColors: string[];
}
interface BackgroundControlsProps {
  background: BackgroundOptions;
  setBackground: (options: BackgroundOptions) => void;
}
export function BackgroundControls({ background, setBackground }: BackgroundControlsProps) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setBackground({ ...background, type: e.target.value as 'solid' | 'gradient' }); };
  const handleSolidColorChange = (e: React.ChangeEvent<HTMLInputElement>) => { setBackground({ ...background, solidColor: e.target.value }); };
  const handleGradientAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setBackground({ ...background, gradientAngle: parseInt(e.target.value, 10) }); };
  const handleGradientColorChange = (index: number, color: string) => {
    const newColors = [...background.gradientColors];
    newColors[index] = color;
    setBackground({ ...background, gradientColors: newColors });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="bg-type">Tipo de Fundo</label>
        <select id="bg-type" value={background.type} onChange={handleTypeChange}>
          <option value="solid">Cor Sólida</option>
          <option value="gradient">Gradiente</option>
        </select>
      </div>
      {background.type === 'solid' && (
        <div className={styles.formGroup}>
          <label htmlFor="bg-solid-color">Cor</label>
          <input type="color" id="bg-solid-color" value={background.solidColor} onChange={handleSolidColorChange} className={styles.colorInput} />
        </div>
      )}
      {background.type === 'gradient' && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="bg-gradient-angle">Ângulo ({background.gradientAngle}°)</label>
            <input type="range" id="bg-gradient-angle" min="0" max="360" value={background.gradientAngle} onChange={handleGradientAngleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Cores</label>
            <div className={styles.colorInputs}>
              {background.gradientColors.map((color, index) => (
                <input key={index} type="color" value={color} className={styles.colorInput} onChange={(e) => handleGradientColorChange(index, e.target.value)} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}