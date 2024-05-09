import { config } from "dotenv";
import dbSetup from "../config/db_config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(dbSetup.database.database, dbSetup.database.user, dbSetup.database.password, {
  host: dbSetup.database.host,
  port: dbSetup.database.db_port,
  dialect:dbSetup.database.dialect
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
