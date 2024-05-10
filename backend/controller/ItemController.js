// controllers/ItemController.js
import Items from "./../models/Item.js";

const ItemController = {
  // Fetch paginated items using .then/.catch
  getPaginatedItems(req, res) {
    const { page = 1, limit = 6 } = req.query; // Default to 6 items per page
    const offset = (page - 1) * limit;

    Items.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    })
      .then(({ count, rows: items }) => {
        res.json({
          items,
          totalItems: count, // Provide the total count
        });
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Error fetching items" });
      });
  },

  // Add a new item using .then/.catch
  addItem(req, res) {
    const { name, description, price, image } = req.body;

    Items.create({ name, description, price, image })
      .then((newItem) => {
        res.json(newItem);
      })
      .catch((error) => {
        console.error("Error adding new item:", error);
        res.status(500).json({ error: "Error adding new item" });
      });
  },

  // Update an existing item using .then/.catch
  updateItem(req, res) {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    Items.findByPk(id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }

        // Update fields with provided values or keep existing values
        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        item.image = image || item.image;

        return item.save(); // Return promise to chain the next .then
      })
      .then((updatedItem) => {
        res.json(updatedItem);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Error updating item" });
      });
  },

  // Delete an existing item using .then/.catch
  deleteItem(req, res) {
    const { id } = req.params;

    Items.findByPk(id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }

        return item.destroy(); // Return promise to chain the next .then
      })
      .then(() => {
        res.json({ message: "Item deleted successfully" });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Error deleting item" });
      });
  },
};

export default ItemController;
