import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid, Container } from '@mui/material';

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(`Item created successfully: ${data.name}`);
        setFormData({ name: "", description: "", price: "", image: "" });
      })
      .catch((error) => {
        setMessage("Error creating item. Please try again.");
        console.error("Error creating item:", error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 3, p: 2 }}>
        <Typography component="h1" variant="h5">
          Create a New Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Create Item
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && (
          <Typography color="textSecondary" mt={2}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ItemCreatePage;

