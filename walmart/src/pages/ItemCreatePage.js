import React, { useState } from "react";
// import axios from 'axios';

const ItemCreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/items";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the server accepts JSON
      },
      body: JSON.stringify(formData), // Convert formData to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(`Item created successfully: ${data.name}`);
        setFormData({ name: "", description: "", price: "", image: "" }); // Clear form data
      })
      .catch((error) => {
        setMessage("Error creating item. Please try again.");
        console.error("Error creating item:", error);
      });
  };

  return (
    <div className="ItemCreatePage">
      <h1>Create a New Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Item Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Item Description"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <button type="submit">Create Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ItemCreatePage;
