import { useCallback, useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);
  const createId = useCallback(
    () =>
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    []
  );

  const addBox = ({ width, height, backgroundColor }) => {
    const nextBox = {
      id: createId(),
      width,
      height,
      backgroundColor,
    };
    setBoxes((current) => [...current, nextBox]);
  };

  const removeBox = (id) => {
    setBoxes((current) => current.filter((box) => box.id !== id));
  };

  return (
    <section className="panel box-panel" aria-label="Color box maker">
      <header>
        <h2>Color Box Maker</h2>
        <p>Create colorful boxes and remove them when you&apos;re done.</p>
      </header>

      <NewBoxForm addBox={addBox} />

      <div className="box-grid" aria-live="polite">
        {boxes.length === 0 ? (
          <p className="empty-state">No boxes yet, add one above.</p>
        ) : (
          boxes.map((box) => <Box key={box.id} {...box} onRemove={removeBox} />)
        )}
      </div>
    </section>
  );
};

export default BoxList;
