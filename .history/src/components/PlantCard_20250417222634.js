import React from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  const { id, name, image, price, inStock } = plant;

  function handleToggleStock() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !inStock })
    })
      .then(res => res.json())
      .then(onUpdatePlant);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" })
      .then(() => onDeletePlant(id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <form>
        <input type="number" step="0.01" value={price} readOnly />
        <button type="submit">Update Price</button>
      </form>
      <button onClick={handleToggleStock}>
        {inStock ? "In Stock" : "Out of Stock"}
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
