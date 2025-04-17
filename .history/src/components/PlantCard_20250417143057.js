import React, { useState } from "react";

function PlantCard({ name, image, price }) {
  const [isInStock, setIsInStock] = useState(true);

  function handleStockClick() {
    setIsInStock((prev) => !prev);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
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
