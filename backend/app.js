import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./datasource.js";
import cors from "cors";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS for a list of allowed origins (specify for safety)
// const allowedOrigins = ["http://localhost:3000"];
const allowedOrigins = ["*"];
const options = {
  origin: allowedOrigins,
};
app.use(cors(options));

// Run this before the other code
try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you.
  // This is not recommended for production-use, but that is a topic for a later time!
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`HTTP server on http://localhost:${PORT}`);
});
