import React, { useState } from "react";

function PlantCard({ plant, onDelete, onUpdate }) {
  const [inStock, setInStock] = useState(plant.inStock);

  function handleToggleStock() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: !inStock }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setInStock(updatedPlant.inStock);
        onUpdate(updatedPlant);
      });
  }

  function handlePriceUpdate(e) {
    e.preventDefault();
    const newPrice = parseFloat(e.target[0].value);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => onUpdate(updatedPlant));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>

      <form onSubmit={handlePriceUpdate}>
        <input type="number" step="0.01" defaultValue={plant.price} />
        <button type="submit">Update Price</button>
      </form>

      <button onClick={handleToggleStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>

      <button
        onClick={() => onDelete(plant.id)}
        style={{ marginTop: "8px", backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
