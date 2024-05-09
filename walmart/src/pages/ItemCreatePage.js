import React, { useState } from 'react';
import axios from 'axios';

const ItemCreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const [message, setMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/items', formData);
      setMessage(`Item created successfully: ${response.data.name}`);
      setFormData({ name: '', description: '', price: '', image: '' }); // Reset form
    } catch (error) {
      setMessage('Error creating item. Please try again.');
      console.error('Error creating item:', error);
    }
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
