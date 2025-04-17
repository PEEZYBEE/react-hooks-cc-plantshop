import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
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

  function handleUpdatePlant(updatedPlant) {
    const updatedList = plants.map((plant) =>
      p.id === updatedPlant.id ? updatedPlant : p
    );
    setPlants(updatedList);
  }

  function handleDelete(deletedPlantId) {
    const updatedList = plants.filter((plant) => plant.id !== deletedPlantId);
    setPlants(updatedList);
  }

  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PlantList
        plants={plantsToDisplay}
        onDelete={handleDelete}
        onUpdatePrice={handleUpdatePlant}
      />
    </main>
  );
}

export default PlantPage;
