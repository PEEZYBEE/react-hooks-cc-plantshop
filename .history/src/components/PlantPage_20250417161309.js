import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlants= plants.map(p => p.id === updatedPlant.id ? updatedPlant : p);
    setPlants(updatedList);
  }

  function handleDeletePlant(id) {
    const updatedList = plants.filter(p => p.id !== id);
    setPlants(updatedList);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList
        plants={filteredPlants}
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
