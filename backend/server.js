import express from "express";
import cors from "cors";
import ItemRoutes from './routes/ItemRoutes.js';
import sequelize from './models/index.js';

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/', ItemRoutes); 

const PORT = process.env.APP_PORT || 8080;
 

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing server:', error);
  }
})();

export default app;
