import axios from "axios";

let module = {};

/**
 * Create a new membership.
 * @param {string} name: title of the membership
 * @param {string} description: description of the membership
 * @param {string} price: price of the membership
 * @param {string} creatorId: id of the creator
 */
module.addMembership = (name, description, price, creatorId) => {
  return axios.post("/api/memberships/", {
    name,
    description,
    default_price_data: price,
    creatorId,
  });
};

/**
 * Retrieve all existing memberships.
 * @param {string} creatorId: id of the creator
 */
module.getAllMembership = (creatorId) => {
  // Get all memberships of the creator
  if (creatorId) return axios.get(`/api/memberships?creatorId=${creatorId}`);
  // Get all existing memberships
  return axios.get("/api/memberships");
};

/**
 * Update attributes in membership.
 * @param {string} membershipId
 * @param {*} variables: attributes to update
 */
module.updateMembership = (membershipId, variables) => {
  return axios.patch(`/api/memberships/${membershipId}`, variables);
};

/**
 * Create a new price for a membership.
 * @param {string} currency: currency of the price
 * @param {string} product: id of the membership
 * @param {Number} unit_amount_decimal: price of the membership
 */
module.addPrice = (currency, product, unit_amount_decimal) => {
  return axios.post("/api/memberships/prices", {
    currency,
    product,
    unit_amount_decimal,
  });
};

/**
 * Retrive all existing prices.
 */
module.getAllPrice = () => {
  return axios.get("/api/memberships/prices");
};

/**
 * Retrieve a price by priceId.
 * @param {string} priceId: id of the price
 */
module.getPriceById = (priceId) => {
  return axios.get(`/api/memberships/prices/${priceId}`);
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
 * @param {Number} totalCost: total cost after adding tax
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

export default module;
