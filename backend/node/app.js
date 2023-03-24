import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./datasource.js";
import { paymentsRouter } from "./routers/payments_router.js";
import { membershipsRouter } from "./routers/memberships_router.js";
import { pricesRouter } from "./routers/prices_router.js";
import { usersRouter } from "./routers/users_router.js";
import session from "express-session";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

// CORS for a list of allowed origins (specify for safety)
const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:3000";
const allowedOrigins = [CLIENT_HOST, "https://checkout.stripe.com"];
// const allowedOrigins = ["*"];
const options = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use(
  session({
    secret: "please change this secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Run this before the other code
try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

// Routers
app.use("/api/payments", paymentsRouter);
app.use("/api/memberships", membershipsRouter);
app.use("/api/prices", pricesRouter);
app.use("/api/users", usersRouter);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`HTTP server on http://${HOST}:${PORT}`);
});