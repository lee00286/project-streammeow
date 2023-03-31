import { Router } from "express";
import { isValidArgument } from "../error_check.js";
import { Memberships } from "../models/memberships.js";
import Sentry from "@sentry/node";

export const membershipsRouter = Router();

/**
 * Create a membership in DB.
 * */
membershipsRouter.post("/", async (req, res) => {
  const reqBody = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(reqBody.name, "string") ||
    !isValidArgument(reqBody.description, "string") ||
    !isValidArgument(reqBody.benefits, "object") ||
    !isValidArgument(reqBody.currency, "string") ||
    !isValidArgument(reqBody.price, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // TODO: get userId from session key (req.session.userId)
    let creatorId = "1";

    // Create a new membership
    const membership = await Memberships.create({
      name: reqBody.name,
      description: reqBody.description,
      benefits: reqBody.benefits,
      currency: reqBody.currency,
      price: reqBody.price,
      creatorId: creatorId,
    });
    return res.status(200).json({ membership });
  } catch (e) {
    const errorMsg = "Failed to create a membership.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Retrieve all memberships from DB.
 * */
membershipsRouter.get("/", async (req, res) => {
  try {
    const { creatorId } = req.query;
    const options = {};
    // Check if it is to retrieve all memberships from a creator
    if (creatorId) {
      // Check validity of creatorId
      if (!isValidArgument(creatorId, "string"))
        return res.status(422).json({ error: "Invalid creatorId." });
      // Set options for retrieving memberships
      // TODO: Pagination
      options.order = [["price", "ASC"]];
      options.where = { creatorId: creatorId };
    }
    // Retrieve memberships
    const memberships = await Memberships.findAll(options);

    if (!memberships)
      return res.status(404).json({ error: "Failed to retrieve memberships." });

    return res.status(200).json({ memberships: memberships });
  } catch (e) {
    const errorMsg = "Failed to retrieve memberships.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Retrieve one membership using membershipId.
 * */
membershipsRouter.get("/:membershipId/", async (req, res, next) => {
  const membershipId = req.params.membershipId;
  // Check validity of membershipId
  if (!isValidArgument(membershipId, "string"))
    return res.status(422).json({ error: "Invalid membershipId." });
  try {
    const membership = await Memberships.findByPk(membershipId);
    if (!membership)
      return res
        .status(404)
        .json({ error: `Membership(id=${membershipId}) doesn't exist.` });
    return res.status(200).json({ membership });
  } catch (e) {
    const errorMsg = "Failed to retrieve a membership.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Update attributes of a membership.
 * */
membershipsRouter.patch("/:membershipId/", async (req, res, next) => {
  const membershipId = req.params.membershipId;
  if (membershipId === "subscribe" || membershipId === "unsubscribe") next();
  const variables = req.body;
  // Check validity of arguments
  if (
    !isValidArgument(membershipId, "string") ||
    !isValidArgument(variables, "object")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Update a membership
    const membership = await Memberships.update(variables, {
      where: { id: membershipId },
    });
    // If membership doesn't exist
    if (!membership)
      return res
        .status(404)
        .json({ error: `Membership(id=${membershipId}) doesn't exist.` });
    return res.status(200).json({ membership });
  } catch (e) {
    const errorMsg = "Failed to update a membership.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Update membership subscriber information.
 * */
membershipsRouter.patch("/subscribe", async (req, res) => {
  const membershipId = req.body.membershipId;
  const userId = req.session.userId;
  // Check validity of arguments
  if (
    !isValidArgument(membershipId, "string") ||
    !isValidArgument(userId, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Get a membership
    let membership = await Memberships.findByPk(membershipId);
    // If membership doesn't exist
    if (!membership)
      return res
        .status(404)
        .json({ error: `Membership(id=${membershipId}) doesn't exist.` });
    // Add user to subscribers array
    let subscribers = membership.subscribers;
    if (!subscribers) subscribers = [];
    subscribers.push(userId);
    // Update a membership
    membership = await Memberships.update(
      { subscribers },
      {
        where: { id: membershipId },
      }
    );
    return res.status(200).json({ membership });
  } catch (e) {
    const errorMsg = "Failed to update a membership.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Update membership subscriber information.
 * */
membershipsRouter.patch("/unsubscribe", async (req, res) => {
  const membershipId = req.body.membershipId;
  const userId = req.session.userId;
  // Check validity of arguments
  if (
    !isValidArgument(membershipId, "string") ||
    !isValidArgument(userId, "number")
  )
    return res.status(422).json({ error: "Invalid arguments." });
  try {
    // Get a membership
    let membership = await Memberships.findByPk(membershipId);
    // If membership doesn't exist
    if (!membership)
      return res
        .status(404)
        .json({ error: `Membership(id=${membershipId}) doesn't exist.` });
    // Remove membership from subscriber array
    const subscribers = membership.subscribers;
    const index = subscribers.indexOf(membershipId);
    if (index > -1) {
      subscription.splice(index, 1);
    }
    // Update a membership
    membership = await Memberships.update(
      { subscribers },
      {
        where: { id: membershipId },
      }
    );
    return res.status(200).json({ membership });
  } catch (e) {
    const errorMsg = "Failed to update a membership.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});

/**
 * Delete a membership.
 * */
membershipsRouter.delete("/:membershipId/", async (req, res) => {
  const membershipId = req.params.membershipId;
  // Check validity of membershipId
  if (!isValidArgument(membershipId, "string"))
    return res.status(422).json({ error: "Invalid membershipId." });
  try {
    const membership = await Memberships.findByPk(membershipId);
    // If membership doesn't exist
    if (!membership)
      res
        .status(404)
        .json({ error: `Membership(id=${membershipId}) doesn't exist.` });
    // If the membership is not created by the user
    // TODO: get userId from session key (req.session.userId)
    let creatorId = "1";
    if (creatorId !== membership.creatorId)
      return res.status(403).json({ error: "Permission denied." });

    // TODO: Should I delete price data?
    // TODO: What happens to subscribers?

    // Delete membership
    await membership.destroy();
    return res.status(200);
  } catch (e) {
    const errorMsg = "Failed to delete a membership.";
    console.log(errorMsg);
    Sentry.captureException(e);
  }
});
