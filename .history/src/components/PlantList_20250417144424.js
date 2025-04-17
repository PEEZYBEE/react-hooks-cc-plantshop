import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onPriceUpdate }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onPriceUpdate={onPriceUpdate}
        />
      ))}
    </ul>
  );
}

export default PlantList;
