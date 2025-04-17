import React from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  function handleToggleStock() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: !plant.inStock }),
    })
      .then((r) => r.json())
      .then(onUpdatePlant);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(plant.id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="number" step="0.01" value={plant.price} readOnly />
        <button type="submit">Update Price</button>
      </form>
      <button onClick={handleToggleStock}>
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button
        style={{ marginTop: "8px", backgroundColor: "red", color: "white" }}
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
