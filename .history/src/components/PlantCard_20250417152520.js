import React, { useState } from "react";

function PlantCard({ plant, onUpdatePrice, onDelete }) {
  const [price, setPrice] = useState(plant.price);

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(price) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePrice(updatedPlant);
      });
  }

  function handleToggleStockClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: !plant.inStock }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePrice(updatedPlant);
      });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(plant.id);
    });
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p> {/* ← match test exactly */}

      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={handlePriceChange}
        />
        <button type="submit">Update Price</button>
      </form>

      <button onClick={handleToggleStockClick}>
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </button>

      <button
        onClick={handleDeleteClick}
        style={{ marginTop: "8px", backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
