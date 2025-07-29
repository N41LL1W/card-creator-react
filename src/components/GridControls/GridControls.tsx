// src/components/GridControls/GridControls.tsx
import styles from './GridControls.module.css';

interface GridControlsProps {
  colSizes: string[];
  rowSizes: string[];
  onUpdate: (updates: { colSizes?: string[]; rowSizes?: string[] }) => void;
}

export function GridControls({ colSizes, rowSizes, onUpdate }: GridControlsProps) {
  const handleAddColumn = () => { if (colSizes.length < 6) onUpdate({ colSizes: [...colSizes, '1fr'] }); };
  const handleRemoveColumn = () => { if (colSizes.length > 1) onUpdate({ colSizes: colSizes.slice(0, -1) }); };
  const handleColumnSizeChange = (index: number, value: string) => {
    const newSizes = [...colSizes];
    newSizes[index] = value;
    onUpdate({ colSizes: newSizes });
  };

  const handleAddRow = () => { if (rowSizes.length < 6) onUpdate({ rowSizes: [...rowSizes, '1fr'] }); };
  const handleRemoveRow = () => { if (rowSizes.length > 1) onUpdate({ rowSizes: rowSizes.slice(0, -1) }); };
  const handleRowSizeChange = (index: number, value: string) => {
    const newSizes = [...rowSizes];
    newSizes[index] = value;
    onUpdate({ rowSizes: newSizes });
  };

  return (
    <div className={styles.container}>
      {/* Seção de Colunas */}
      <div className={styles.controlGroup}>
        <div className={styles.labelWithButtons}>
          <label>Colunas</label>
          <div className={styles.buttons}>
            <button onClick={handleAddColumn}>+</button>
            <button onClick={handleRemoveColumn}>-</button>
          </div>
        </div>
        <div className={styles.sizesContainer}>
          {colSizes.map((size, index) => (
            <input 
              key={`col-${index}`}
              type="text" 
              value={size}
              onChange={(e) => handleColumnSizeChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      
      {/* Seção de Linhas */}
      <div className={styles.controlGroup}>
        <div className={styles.labelWithButtons}>
          <label>Linhas</label>
          <div className={styles.buttons}>
            <button onClick={handleAddRow}>+</button>
            <button onClick={handleRemoveRow}>-</button>
          </div>
        </div>
        <div className={styles.sizesContainer}>
          {rowSizes.map((size, index) => (
            <input 
              key={`row-${index}`}
              type="text" 
              value={size}
              onChange={(e) => handleRowSizeChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}