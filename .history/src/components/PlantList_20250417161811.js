import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onUpdate }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
        key={plant.id}
        plant={plant}
        onDeletePlant={handleDeletePlant}
        onUpdatePlant={handleUpdatePlant}
      />
      
      ))}
    </ul>
  );
}

export default PlantList;
