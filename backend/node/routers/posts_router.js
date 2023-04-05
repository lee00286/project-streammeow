import { Router } from "express";
import { isValidArgument } from "../error_check.js";
import { Posts } from "../models/posts.js";
import { Creators } from "../models/creators.js";
import { isAuthenticated } from "../middleware/auth.js";
import { Op } from "sequelize";
import Sentry from "@sentry/node";

export const postsRouter = Router();

/**
 * Create a post in DB.
 * */
postsRouter.post("/", isAuthenticated, async (req, res) => {
  // Check validity of arguments
  if (
    !isValidArgument(req.body.creatorId, "number") ||
    !isValidArgument(req.body.title, "string") ||
    !isValidArgument(req.body.description, "string") ||
    (req.body.permission !== [] &&
      !isValidArgument(req.body.permission, "array"))
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Create a new post
    const post = await Posts.create({
      title: req.body.title,
      description: req.body.description,
      permission: req.body.permission,
      likes: 0,
      dislikes: 0,
      comments: null,
      createdAt: new Date(),
      creatorId: req.body.creatorId,
    });
    return res.status(200).json({ post });
  } catch (e) {
    const errorMsg = "Failed to create a post.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Retrieve all posts from DB.
 * */
postsRouter.get("/", isAuthenticated, async (req, res) => {
  try {
    const { creatorId, permission } = req.query;
    const options = {};
    // Check if it is to retrieve all posts from a creator
    if (creatorId) {
      // Check validity of creatorId
      if (!isValidArgument(creatorId, "string"))
        return res.status(422).json({ error: "Invalid creatorId." });
      // If permission given
      if (permission !== null && isValidArgument(permission, "string")) {
        options.where = {
          creatorId: creatorId,
          [Op.or]: [
            { permission: null },
            { permission: { [Op.contains]: [permission] } },
          ],
        };
      } else {
        // Set options for retrieving posts
        options.where = { creatorId: creatorId };
      }
    }
    // TODO: Pagination
    options.order = [["id", "DESC"]];
    // Retrieve posts
    const posts = await Posts.findAll(options);
    if (!posts)
      return res.status(404).json({ error: "Failed to retrieve posts." });
    return res.status(200).json({ posts: posts });
  } catch (e) {
    const errorMsg = "Failed to retrieve posts.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Retrieve one post using postId.
 * */
postsRouter.get("/:postId/", isAuthenticated, async (req, res) => {
  const postId = req.params.postId;
  // Check validity of postId
  if (!isValidArgument(postId, "string"))
    return res.status(422).json({ error: "Invalid postId." });
  try {
    const post = await Posts.findByPk(postId);
    if (!post) return res.status(404).json({ error: `Post doesn't exist.` });
    return res.status(200).json({ post });
  } catch (e) {
    const errorMsg = "Failed to retrieve a post.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Update attributes of a post.
 * */
postsRouter.patch("/:postId/", isAuthenticated, async (req, res, next) => {
  const postId = req.params.postId;
  if (membershipId === "like") next();
  const variables = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(postId, "string") ||
    !isValidArgument(variables, "object")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Update a post
    const post = await Posts.update(variables, {
      where: { id: postId },
    });
    // If post doesn't exist
    if (!post) return res.status(404).json({ error: `Post doesn't exist.` });
    return res.status(200).json({ post });
  } catch (e) {
    const errorMsg = "Failed to update a post.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Like or dislike of a post.
 * */
postsRouter.patch("/likes/:postId/", isAuthenticated, async (req, res) => {
  const postId = req.params.postId;
  // Check validity of arguments
  if (
    !isValidArgument(postId, "string") ||
    !isValidArgument(req.body.action, "string")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    const post = await Posts.findByPk(postId);
    // If post doesn't exist
    if (!post) return res.status(404).json({ error: `Post doesn't exist.` });
    // Like or dislike a post
    switch (req.body.action) {
      case "likes":
        post = await Posts.increment({ likes: 1 });
        break;
      case "dislikes":
        post = await Posts.increment({ dislikes: 1 });
        break;
      default:
        return res.status(422).json({ error: "Invalid action." });
    }
    return res.status(200).json({ post });
  } catch (e) {
    const errorMsg = "Failed to like/dislike a post.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Delete a post.
 * */
postsRouter.delete("/:postId/", isAuthenticated, async (req, res) => {
  const postId = req.params.postId;
  // Check validity of postId
  if (!isValidArgument(postId, "string"))
    return res.status(422).json({ error: "Invalid postId." });
  try {
    const post = await Posts.findByPk(postId);
    // If post doesn't exist
    if (!post) res.status(404).json({ error: `Post doesn't exist.` });
    // If the post is not created by the creator
    const creator = await Creators.findOne({
      where: { userId: req.session.userId },
    });
    if (creator === null || creator.id !== post.creatorId)
      return res.status(403).json({ error: "Permission denied." });
    // Delete post
    await post.destroy();
    return res.status(200);
  } catch (e) {
    const errorMsg = "Failed to delete a post.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});
