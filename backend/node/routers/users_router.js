import { Router } from "express";
import { isValidArgument } from "../error_check.js";
import { User } from "../models/users.js";
import { isAuthenticated, isNotAuthenticated } from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import Sentry from "@sentry/node";
import multer from "multer";
import path from "path";
import fs from "fs";

export const usersRouter = Router();
export const user_bcrypt = bcrypt;
const upload = multer({ dest: "user_picture/" });

usersRouter.post("/signup", isNotAuthenticated, async (req, res) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  let password = req.body.password;
  let email = req.body.email;
  password = bcrypt.hashSync(password, salt);
  let user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ error: "Email address already registered" });
  }
  try {
    const user = await User.create({
      email: email,
      password: password,
    });
    req.session.userId = user.id;
    return res.status(200).json({ user });
  } catch (e) {
    const errorMsg = "Failed to create a user.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

usersRouter.post("/login", isNotAuthenticated, async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  let user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: "Email address not registered" });
  }
  const hash = user.password;
  const match = bcrypt.compareSync(password, hash);
  if (!match) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }
  req.session.userId = user.id;
  return res.status(200).json({ user });
});

usersRouter.post("/logout", isAuthenticated, async (req, res) => {
  // Remove data stored in session
  req.session.destroy();
  req.session = null;
  // Remove cookie
  res.clearCookie();
  return res.status(200).json({ success: true });
});

usersRouter.get("/me", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(200).json({ user: undefined });
  }
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json({ user });
});

/**
 * Retrieve one user information using userId.
 * */
usersRouter.get("/:userId/", isAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  // Check validity of userId
  if (!isValidArgument(userId, "string"))
    return res.status(422).json({ error: "Invalid userId." });
  try {
    const user = await User.findByPk(userId);
    if (!user)
      return res
        .status(404)
        .json({ error: `User(id=${userId}) doesn't exist.` });
    return res.status(200).json({ user });
  } catch (e) {
    const errorMsg = "Failed to retrieve a user.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

usersRouter.get("/:userId/picture", async (req, res) => {
  let userId = req.params.userId;
  const user = await User.findByPk(userId);
  if (user.picture) {
    res.setHeader("Content-Type", user.picture.mimetype);
    res.sendFile(user.picture.path, { root: path.resolve() });
  } else {
    res
      .status(404)
      .json({ error: req.params.userId + "User picture not found" });
  }
});

/**
 * Update user information.
 * */
usersRouter.patch(
  "/:userId/",
  upload.single("picture"),
  isAuthenticated,
  async (req, res) => {
    const userId = req.params.userId;
    const variables = req.body;
    const image = req.file;
    // Check validity of arguments
    if (
      !isValidArgument(userId, "string") ||
      !isValidArgument(variables, "object") ||
      !isValidArgument(image, "object")
    )
      return res.status(422).json({ error: "Invalid arguments." });
    try {
      // Update a membership
      const user = await User.update(variables, {
        where: { id: userId },
      });
      if (image) {
        const user = await User.update(
          { picture: image },
          {
            where: { id: userId },
          }
        );
      }
      // If user doesn't exist
      if (!user)
        return res
          .status(404)
          .json({ error: `User(id=${userId}) doesn't exist.` });
      return res.status(200).json({ user });
    } catch (e) {
      const errorMsg = "Failed to update user information.";
      console.log(errorMsg);
      Sentry.captureException(e);
    }
  }
);
