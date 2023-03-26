import axios from "axios";

let module = {};

/**
 * Create a new membership to DB.
 * @param {string} name: name of the membership
 * @param {string} description: description of the membership
 * @param {Array} benefits: benefits of the membership
 * @param {string} currency: currency of the price
 * @param {number} price: price of the membership
 */
module.addMembership = (name, description, benefits, currency, price) => {
  return axios.post("/api/memberships/", {
    name,
    description,
    benefits,
    currency,
    price,
  });
};

/**
 * Retrieve all existing memberships from DB.
 * If creatorId is provided, retrieve all memberships of the creator.
 * @param {string} creatorId: id of the creator
 */
module.getAllMemberships = (creatorId) => {
  // Get all memberships of the creator
  if (creatorId) return axios.get(`/api/memberships?creatorId=${creatorId}`);
  // Get all existing memberships
  return axios.get("/api/memberships");
};

/**
 * Retrieve a membership from DB.
 * @param {string} membershipId: id of the membership
 */
module.getMembershipById = (membershipId) => {
  // Get a membership using membershipId
  return axios.get(`/api/memberships/${membershipId}`);
};

/**
 * Update attributes in membership.
 * @param {string} membershipId: id of the membership
 * @param {Object} variables: attributes to update
 */
module.updateMembership = (membershipId, variables) => {
  return axios.patch(`/api/memberships/${membershipId}`, variables);
};

/**
 * Delete a membership from DB.
 * @param {string} membershipId: id of the membership
 */
module.deleteMembership = (membershipId) => {
  return axios.delete(`/api/memberships/${membershipId}`);
};

/**
 * Create a new price for a membership in Stripe.
 * @param {string} membershipName: name of the membership
 * @param {string} currency: currency of the price
 * @param {number} price: price of the membership
 */
module.addPrice = (membershipName, currency, price) => {
  return axios.post("/api/prices", { membershipName, currency, price });
};

/**
 * Retrive all existing prices from Stripe.
 */
module.getAllPrices = () => {
  return axios.get("/api/prices");
};

/**
 * Retrieve a price from Stripe, by priceId.
 * @param {string} priceId: id of the price
 */
module.getPriceById = (priceId) => {
  return axios.get(`/api/prices/${priceId}`);
};

/**
 * Update attributes in price.
 * @param {string} priceId: id of the price
 * @param {Object} variables: attributes to update
 */
module.updatePrice = (priceId, variables) => {
  return axios.patch(`/api/prices/${priceId}`, variables);
};

/**
 * Delete a price from Stripe.
 * @param {string} priceId: id of the price
 */
module.deletePrice = (priceId) => {
  return axios.delete(`/api/prices/${priceId}`);
};

/**
 * Create a checkout session.
 * @param {string} priceId: id of the price to checkout
 */
module.addCheckoutSession = (priceId) => {
  return axios.post("/api/payments/checkout-session", { priceId });
};

/**
 * Get a session by sessionId.
 * @param {string} sessionId: id of the session
 */
module.getSession = (sessionId) => {
  return axios.get(`/api/payments/session/${sessionId}`);
};

/**
 * Summarize payment.
 * @param {string} invoiceId: id of the invoice
 */
module.summarizePayment = (invoiceId) => {
  return axios.post("/api/payments/summarize", { invoiceId });
};

/**
 * Create a new payment intent.
 * @param {number} totalCost: total cost after adding tax
 * @param {string} currency: currency of the price
 */
module.addPaymentIntent = (totalCost, currency) => {
  return axios.post("/api/payments/payment-intent", { totalCost, currency });
};

/**
 * Create portal session.
 */
module.addPortalSession = () => {
  return axios.post("/api/payments/create-portal-session", {});
};

/**
 * User registration.
 * @param {string} email: email of the user
 * @param {string} password: password of the user
 */
module.UserRegister = (email, password) => {
  return axios.post("/api/users/signup", { email, password });
};

/**
 * User login.
 * @param {string} email: email of the user
 * @param {string} password: password of the user
 */
module.UserLogin = (email, password) => {
  return axios.post("/api/users/login", { email, password });
};

/**
 * User logout.
 */
module.UserLogout = () => {
  return axios.get("/api/users/logout");
};

/**
 * Retrieve current user id.
 */
module.getUserId = () => {
  return axios.get("/api/users/me");
};

/**
 * Create a new streaming to DB.
 * @param {string} name: title of the streaming
 * @param {string} description: description of the streaming
 * @param {Array} permission: allowed streaming plans to watch the streaming
 */
module.addStreaming = (title, description, permission) => {
  return axios.post("/api/streamings/", {
    title,
    description,
    permission,
  });
};

/**
 * Retrieve all existing streamings from DB.
 * If creatorId is provided, retrieve all streamings of the creator.
 * @param {string} creatorId: id of the creator
 */
module.getAllStreamings = (creatorId) => {
  // Get all streamings of the creator
  if (creatorId) return axios.get(`/api/streamings?creatorId=${creatorId}`);
  // Get all existing streamings
  return axios.get("/api/streamings");
};

/**
 * Retrieve a streaming from DB.
 * @param {string} streamingId: id of the streaming
 */
module.getStreamingById = (streamingId) => {
  // Get a streaming using streamingId
  return axios.get(`/api/streamings/${streamingId}`);
};

/**
 * Update attributes in streaming.
 * @param {string} streamingId: id of the streaming
 * @param {Object} variables: attributes to update
 */
module.updateStreaming = (streamingId, variables) => {
  return axios.patch(`/api/streamings/${streamingId}`, variables);
};

/**
 * Delete a streaming from DB.
 * @param {string} streamingId: id of the streaming
 */
module.deleteStreaming = (streamingId) => {
  return axios.delete(`/api/streamings/${streamingId}`);
};

export default module;
