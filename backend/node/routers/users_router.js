import { Router } from "express";
import { isValidArgument } from "../error_check.js";
import { User } from "../models/users.js";
import {
  isAuthenticated,
  isNotAuthenticated,
  checkJwt,
} from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import Sentry from "@sentry/node";
import multer from "multer";
import path from "path";

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

usersRouter.post(
  "/auth0",
  checkJwt,
  upload.single("picture"),
  async (req, res) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let password = req.body.email;
    let email = req.body.email;
    let name = req.body.name;
    let picture = req.file;
    password = bcrypt.hashSync(password, salt);
    let user = await User.findOne({ where: { email } });
    if (user && user.auth0 === false) {
      return res
        .status(400)
        .json({ error: "Email address already registered" });
    }
    if (user && user.auth0 === true) {
      //sign in
      let password = req.body.email;
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
    }
    try {
      const user = await User.create({
        email: email,
        password: password,
        name: name,
        picture: picture,
        auth0: true,
      });
      req.session.userId = user.id;
      return res.status(200).json({ user });
    } catch (e) {
      const errorMsg = "Failed to create a user.";
      console.log(errorMsg);
      Sentry.captureException(e);
    }
  }
);

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
    res.setHeader("Content-Type", user.picture.mimetype);
    res.sendFile("/icons/user.png", { root: path.resolve() });
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
      (variables && !isValidArgument(variables, "object")) ||
      (image && !isValidArgument(image, "object"))
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

usersRouter.patch("/:userId/", isAuthenticated, async (req, res, next) => {
  const userId = req.params.userId;
  if (userId === "subscribe" || userId === "unsubscribe") next();

  const variables = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(userId, "string") ||
    !isValidArgument(variables, "object")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Update a membership
    const user = await User.update(variables, {
      where: { id: userId },
    });
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
});

/**
 * Update user subscription information.
 * */
usersRouter.patch("/subscribe", isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  let membershipId = req.body.membershipId;
  // Check validity of arguments
  if (
    !isValidArgument(userId, "number") ||
    !isValidArgument(membershipId, "string") ||
    !isValidArgument(req.body.date, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  membershipId = `${membershipId}+${req.body.date}`;
  try {
    // Get a user
    let user = await User.findByPk(userId);
    // If user doesn't exist
    if (!user)
      return res
        .status(404)
        .json({ error: `User(id=${userId}) doesn't exist.` });
    // Add membership to subscription array
    let subscription = user.subscription;
    if (!subscription) subscription = [];
    subscription.push(membershipId);
    // Update a membership
    user = await User.update(
      { subscription },
      {
        where: { id: userId },
      }
    );
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
});

/**
 * Update user subscription information.
 * */
usersRouter.patch("/unsubscribe", isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  let membershipId = req.body.membershipId;
  // Check validity of arguments
  if (
    !isValidArgument(userId, "number") ||
    !isValidArgument(membershipId, "string")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  membershipId = parseInt(membershipId);
  try {
    // Get a membership
    let user = await User.findByPk(userId);
    // If user doesn't exist
    if (!user)
      return res
        .status(404)
        .json({ error: `User(id=${userId}) doesn't exist.` });
    // Remove membership from subscription array
    const subscription = user.subscription;
    const index = subscription.indexOf(membershipId);
    if (index > -1) {
      subscription.splice(index, 1);
    }
    // Update a membership
    user = await User.update(
      { subscription },
      {
        where: { id: userId },
      }
    );
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
});
