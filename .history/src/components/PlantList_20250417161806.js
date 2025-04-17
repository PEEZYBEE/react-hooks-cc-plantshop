import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onUpdate }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        
      ))}
    </ul>
  );
}

export default PlantList;
