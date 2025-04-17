import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleStock, onUpdatePrice }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleStock={onToggleStock}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default PlantList;
