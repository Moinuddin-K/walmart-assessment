import Items from "./../models/Item.js";

const ItemController = {
  async getPaginatedItems(req, res) {
    const { page = 1, limit = 6 } = req.query; // Update the default limit
    const offset = (page - 1) * limit;

    try {
      const { count, rows: items } = await Items.findAndCountAll({
        offset,
        limit: parseInt(limit),
        order: [["createdAt", "DESC"]],
      });

      res.json({
        items,
        totalItems: count, // Provide the total count
      });
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Error fetching items" });
    }
  },

  async addItem(req, res) {
    const { name, description, price, image } = req.body;

    try {
      const newItem = await Items.create({ name, description, price, image });
      res.json(newItem);
    } catch (error) {
      console.error("Error adding new item:", error);
      res.status(500).json({ error: "Error adding new item" });
    }
  },

  async updateItem(req, res) {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    try {
      const item = await Items.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      item.name = name || item.name;
      item.description = description || item.description;
      item.price = price || item.price;
      item.image = image || item.image;
      await item.save();

      res.json(item);
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Error updating item" });
    }
  },

  async deleteItem(req, res) {
    const { id } = req.params;

    try {
      const item = await Items.findByPk(id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      await item.destroy();
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Error deleting item" });
    }
  },

  async searchItems(req, res) {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ error: "Query parameter is missing" });

    try {
      const q = `%${query}%`;
      const items = await Item.findAll({
        where: {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: q } },
            { description: { [Sequelize.Op.like]: q } },
            { price: { [Sequelize.Op.like]: q } },
            { image: { [Sequelize.Op.like]: q } },
          ],
        },
      });
      res.json({ items });
    } catch (error) {
      console.error("Error searching items:", error);
      res.status(500).json({ error: "Error searching items" });
    }
  },
};

export default ItemController;
