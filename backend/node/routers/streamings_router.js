import { Router } from "express";
import { isValidArgument } from "../error_check.js";
import { Streamings } from "../models/streamings.js";

export const streamingsRouter = Router();

/**
 * Create a streaming in DB.
 * */
streamingsRouter.post("/", async (req, res) => {
  // Check validity of arguments
  if (
    !isValidArgument(req.body.title, "string") ||
    !isValidArgument(req.body.description, "string")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    let creatorId = req.session.userId;
    // Create a new streaming
    const streaming = await Streamings.create({
      title: req.body.title,
      description: req.body.description,
      permission: req.body.permission,
      createdAt: new Date(),
      creatorId: creatorId,
    });
    return res.status(200).json({ streaming });
  } catch (e) {
    const errorMsg = "Failed to create a streaming.";
    console.log(errorMsg);
  }
});

/**
 * Retrieve all streamings from DB.
 * */
streamingsRouter.get("/", async (req, res) => {
  try {
    const { creatorId } = req.query;
    const options = {};
    // Check if it is to retrieve all streamings from a creator
    if (creatorId) {
      // Check validity of creatorId
      if (!isValidArgument(creatorId, "string"))
        return res.status(422).json({ error: "Invalid creatorId." });
      // Set options for retrieving streamings
      options.where = { creatorId: creatorId };
    }
    // TODO: Pagination
    options.order = [["id", "DESC"]];
    // Retrieve streamings
    const streamings = await Streamings.findAll(options);
    if (!streamings)
      return res.status(404).json({ error: "Failed to retrieve streamings." });
    return res.status(200).json({ streamings: streamings });
  } catch (e) {
    const errorMsg = "Failed to retrieve streamings.";
    console.log(errorMsg);
  }
});

/**
 * Retrieve one streaming using streamingId.
 * */
streamingsRouter.get("/:streamingId/", async (req, res) => {
  const streamingId = req.params.streamingId;
  // Check validity of streamingId
  if (!isValidArgument(streamingId, "string"))
    return res.status(422).json({ error: "Invalid streamingId." });
  try {
    const streaming = await Streamings.findByPk(streamingId);
    if (!streaming)
      return res
        .status(404)
        .json({ error: `Streaming(id=${streamingId}) doesn't exist.` });
    return res.status(200).json({ streaming });
  } catch (e) {
    const errorMsg = "Failed to retrieve a streaming.";
    console.log(errorMsg);
  }
});

/**
 * Update attributes of a streaming.
 * */
streamingsRouter.patch("/:streamingId/", async (req, res) => {
  const streamingId = req.params.streamingId;
  const variables = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(streamingId, "string") ||
    !isValidArgument(variables, "object")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Update a streaming
    const streaming = await Streamings.update(variables, {
      where: { id: streamingId },
    });
    // If streaming doesn't exist
    if (!streaming)
      return res
        .status(404)
        .json({ error: `Streaming(id=${streamingId}) doesn't exist.` });
    return res.status(200).json({ streaming });
  } catch (e) {
    const errorMsg = "Failed to update a streaming.";
    console.log(errorMsg);
  }
});

/**
 * Delete a streaming.
 * */
streamingsRouter.delete("/:streamingId/", async (req, res) => {
  const streamingId = req.params.streamingId;
  // Check validity of streamingId
  if (!isValidArgument(streamingId, "string"))
    return res.status(422).json({ error: "Invalid streamingId." });
  try {
    const streaming = await Streamings.findByPk(streamingId);
    // If streaming doesn't exist
    if (!streaming)
      res
        .status(404)
        .json({ error: `Streaming(id=${streamingId}) doesn't exist.` });
    // If the streaming is not created by the user
    let creatorId = req.session.id;
    if (creatorId !== streaming.creatorId)
      return res.status(403).json({ error: "Permission denied." });
    // Delete streaming
    await streaming.destroy();
    return res.status(200);
  } catch (e) {
    const errorMsg = "Failed to delete a streaming.";
    console.log(errorMsg);
  }
});
