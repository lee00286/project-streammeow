/**
 * Check if the arguments are valid.
 * @param {*} argument: argument sent through the request body
 * @param {string} type: expected type of element
 * @returns {boolean} true if valid, false otherwise
 */
export const isValidArgument = (argument, type) => {
  return (
    argument !== null && argument !== undefined && typeof argument === type
  );
};

/**
 * Check the type of errors on stripe API.
 * @param {*} e: error from the stripe API request
 * @returns {string} error message for each type of error
 */
export const stripeCatchError = (e) => {
  let errorMsg = "";
  switch (e.type) {
    case "StripeCardError":
      errorMsg = `A payment error occurred: ${e.message}`;
      break;
    case "StripeInvalidRequestError":
      errorMsg = "An invalid request occurred.";
      break;
    case "StripeConnectionError":
      errorMsg = "A network problem between server and Stripe occured.";
      break;
    case "StripeAPIError":
      errorMsg = "An error occurred on Stripe's end.";
      break;
    case "StripeAuthenticationError":
      errorMsg = "Can't authenticate user with the provided information.";
      break;
    case "StripeIdempotencyError":
      errorMsg = "Used an idempotency key for something unexpected.";
      break;
    case "StripePermissionError":
      errorMsg = "The API key doesn't have the necessary permissions.";
      break;
    case "StripeRateLimitError":
      errorMsg = "Too many API calls in too short a time.";
      break;
    case "StripeSignatureVerificationError":
      errorMsg = "Can't authenticate webhook signature with the webhook event.";
      break;
    default:
      errorMsg = "Another problem occurred, maybe unrelated to Stripe.";
      break;
  }
  return errorMsg;
};
