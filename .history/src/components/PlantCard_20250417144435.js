import React, { useState } from "react";

function PlantCard({ plant, onPriceUpdate }) {
  const { id, name, image, price } = plant;
  const [isInStock, setIsInStock] = useState(true);
  const [editablePrice, setEditablePrice] = useState(price);

  function handleStockClick() {
    setIsInStock((prev) => !prev);
  }

  function handlePriceChange(e) {
    setEditablePrice(e.target.value);
  }

  function handlePriceBlur() {
    const updatedPrice = parseFloat(editablePrice);
    if (!isNaN(updatedPrice) && updatedPrice !== price) {
      fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: updatedPrice }),
      })
        .then((r) => r.json())
        .then((updatedPlant) => {
          onPriceUpdate(updatedPlant); // update parent state
        });
    }
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>
        Price: $
        <input
          type="number"
          step="0.01"
          value={editablePrice}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
          style={{ width: "60px" }}
        />
      </p>
      {isInStock ? (
        <button className="primary" onClick={handleStockClick}>
          In Stock
        </button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
