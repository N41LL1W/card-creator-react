// src/components/GridControls/GridControls.tsx
import styles from './GridControls.module.css';

interface GridControlsProps {
  colSizes: string[];
  setColSizes: (sizes: string[]) => void;
  rowSizes: string[];
  setRowSizes: (sizes: string[]) => void;
}

export function GridControls({ colSizes, setColSizes, rowSizes, setRowSizes }: GridControlsProps) {
  const handleAddColumn = () => { if (colSizes.length < 6) setColSizes([...colSizes, '1fr']); };
  const handleRemoveColumn = () => { if (colSizes.length > 1) setColSizes(colSizes.slice(0, -1)); };
  const handleColumnSizeChange = (index: number, value: string) => {
    const newSizes = [...colSizes];
    newSizes[index] = value;
    setColSizes(newSizes);
  };
  
  const handleAddRow = () => { if (rowSizes.length < 6) setRowSizes([...rowSizes, '1fr']); };
  const handleRemoveRow = () => { if (rowSizes.length > 1) setRowSizes(rowSizes.slice(0, -1)); };
  const handleRowSizeChange = (index: number, value: string) => {
    const newSizes = [...rowSizes];
    newSizes[index] = value;
    setRowSizes(newSizes);
  };

  return (
    <div className={styles.sectionContent}>
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
            <input key={`col-${index}`} type="text" value={size} onChange={(e) => handleColumnSizeChange(index, e.target.value)} />
          ))}
        </div>
      </div>
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
            <input key={`row-${index}`} type="text" value={size} onChange={(e) => handleRowSizeChange(index, e.target.value)} />
          ))}
        </div>
      </div>
    </div>
  );
}