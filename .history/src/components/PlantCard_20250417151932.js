import React, { useState } from "react";

function PlantCard({ plant, onToggleStock, onUpdatePrice, onDelete }) {
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

  function handleToggleStock() {
    const updatedStock = !plant.inStock;

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: updatedStock }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onToggleStock(updatedPlant);
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
      <p>Price: ${Number(plant.price).toFixed(2)}</p>

      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={handlePriceChange}
        />
        <button type="submit">Update Price</button>
      </form>

      {plant.inStock ? (
        <button className="primary" onClick={handleToggleStock}>
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}

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
