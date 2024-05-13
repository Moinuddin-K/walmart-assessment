import Items from "./../models/Item.js";

const ItemController = {
  getPaginatedItems(req, res) {
    const { page = 1, limit = 8} = req.query; 
    const offset = (page - 1) * limit;

    Items.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    })
      .then(({ count, rows: items }) => {
        res.json({
          items,
          totalItems: count,
        });
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Error fetching items" });
      });
  },

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

  updateItem(req, res) {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    Items.findByPk(id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        item.image = image || item.image;

        return item.save(); 
      })
      .then((updatedItem) => {
        res.json(updatedItem);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Error updating item" });
      });
  },

  deleteItem(req, res) {
    const { id } = req.params;

    Items.findByPk(id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }

        return item.destroy(); 
      })
      .then(() => {
        res.json({ message: "Item deleted successfully" });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Error deleting item" });
      });
  },

  deleteAllItems(req, res) {
    Items.destroy({
      where: {},
      truncate: true 
    })
      .then(() => {
        res.json({ message: "All items deleted successfully" });
      })
      .catch((error) => {
        console.error("Error deleting all items:", error);
        res.status(500).json({ error: "Error deleting all items" });
      });
    },
};

export default ItemController;
