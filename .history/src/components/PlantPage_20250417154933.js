import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleToggleStock(updatedPlant) {
    const updatedPlants = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlants(updatedPlants);
  }

  function handleSearchChange(query) {
    setSearchQuery(query);
  }

  function handleUpdatePrice(updatedPlant) {
    const updatedPlants = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlants(updatedPlants);
  }

  function handleDeletePlant(id) {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList
        plants={filteredPlants}
        onToggleStock={handleToggleStock}
        onUpdatePrice={handleUpdatePrice}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
