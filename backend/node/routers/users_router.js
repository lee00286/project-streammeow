import { Router } from "express";
import { User } from "../models/users.js";
import bcrypt from "bcryptjs";

export const usersRouter = Router();

usersRouter.post("/signup", async (req, res) => {
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
  }
});

usersRouter.post("/login", async (req, res) => {
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

usersRouter.post("/logout", async (req, res) => {
  req.session.destroy();
  return res.status(200).redirect("/");
});

usersRouter.get("/me", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
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
usersRouter.get("/:userId/", async (req, res) => {
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
  }
});
