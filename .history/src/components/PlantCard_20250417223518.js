import React from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price, inStock } = plant;

  function handleToggleStock() {
    const updatedPlant = { ...plant, inStock: !inStock };

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ inStock: updatedPlant.inStock }),
    })
      .then((r) => r.json())
      .then((data) => onUpdatePlant(data));
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newPrice = parseFloat(e.target.price.value);
          if (!isNaN(newPrice)) {
            const updatedPlant = { ...plant, price: newPrice };
            fetch(`http://localhost:6001/plants/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "Application/JSON",
              },
              body: JSON.stringify({ price: newPrice }),
            })
              .then((r) => r.json())
              .then((data) => onUpdatePlant(data));
          }
        }}
      >
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={price}
          readOnly
        />
        <button type="submit">Update Price</button>
      </form>
      <button onClick={handleToggleStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button
        onClick={handleDelete}
        style={{ marginTop: "8px", backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
