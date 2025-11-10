
import dotenv from "dotenv";
dotenv.config();

import AppDataSource from "./db";
import app from "./app";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize DB", err);
    process.exit(1);
  });
