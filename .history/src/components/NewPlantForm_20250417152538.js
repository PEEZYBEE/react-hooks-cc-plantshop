function handleSubmit(e) {
  e.preventDefault();
  const newPlant = {
    name,
    image,
    price: price.toString() // send as string for test
  };

  fetch("http://localhost:6001/plants", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON", // case-sensitive for test
    },
    body: JSON.stringify(newPlant),
  })
    .then((r) => r.json())
    .then(onAddPlant);
}
