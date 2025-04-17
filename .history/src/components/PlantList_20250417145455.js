import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleStock, onUpdatePrice, onDeletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleStock={onToggleStock}
          onUpdatePrice={onUpdatePrice}
          onDeletePlant={onDeletePlant} // ✅ Pass this down
        />
      ))}
    </ul>
  );
}

export default PlantList;
