import { Router } from "express";
import { isValidArgument } from "../error_check.js";
import { Creators } from "../models/creators.js";
import { isAuthenticated } from "../middleware/auth.js";
import Sentry from "@sentry/node";

export const creatorsRouter = Router();

/**
 * Create a creator in DB.
 * */
creatorsRouter.post("/", isAuthenticated, async (req, res) => {
  try {
    let userId = req.session.userId;
    // Create a new creator
    const creator = await Creators.create({
      createdAt: new Date(),
      userId: userId,
    });
    return res.status(200).json({ creator });
  } catch (e) {
    const errorMsg = "Failed to create a creator.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Retrieve all creators from DB.
 * */
creatorsRouter.get("/", isAuthenticated, async (req, res) => {
  try {
    // Retrieve creators
    const creators = await Creators.findAll({ order: [["id", "DESC"]] });
    if (!creators)
      return res.status(404).json({ error: "Failed to retrieve creators." });
    return res.status(200).json({ creators: creators });
  } catch (e) {
    const errorMsg = "Failed to retrieve creators.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Retrieve one creator using creatorId.
 * */
creatorsRouter.get("/:creatorId/", isAuthenticated, async (req, res) => {
  const creatorId = req.params.creatorId;
  // Check validity of creatorId
  if (!isValidArgument(creatorId, "string"))
    return res.status(422).json({ error: "Invalid creatorId." });
  try {
    const creator = await Creators.findByPk(creatorId);
    if (!creator)
      return res
        .status(404)
        .json({ error: `Creator(id=${creatorId}) doesn't exist.` });
    return res.status(200).json({ creator });
  } catch (e) {
    const errorMsg = "Failed to retrieve a creator.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Update attributes of a creator.
 * */
creatorsRouter.patch("/:creatorId/", isAuthenticated, async (req, res) => {
  const creatorId = req.params.creatorId;
  const variables = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(creatorId, "string") ||
    !isValidArgument(variables, "object")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Update a creator
    const creator = await Creators.update(variables, {
      where: { id: creatorId },
    });
    // If creator doesn't exist
    if (!creator)
      return res
        .status(404)
        .json({ error: `Creator(id=${creatorId}) doesn't exist.` });
    return res.status(200).json({ creator });
  } catch (e) {
    const errorMsg = "Failed to update a creator.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Delete a creator.
 * */
creatorsRouter.delete("/:creatorId/", isAuthenticated, async (req, res) => {
  const creatorId = req.params.creatorId;
  // Check validity of creatorId
  if (!isValidArgument(creatorId, "string"))
    return res.status(422).json({ error: "Invalid creatorId." });
  try {
    const creator = await Creators.findByPk(creatorId);
    // If creator doesn't exist
    if (!creator)
      res
        .status(404)
        .json({ error: `Creator(id=${creatorId}) doesn't exist.` });
    // If the creator is not created by the user
    let creatorId = req.session.id;
    if (creatorId !== creator.creatorId)
      return res.status(403).json({ error: "Permission denied." });
    // Delete creator
    await creator.destroy();
    return res.status(200);
  } catch (e) {
    const errorMsg = "Failed to delete a creator.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});
