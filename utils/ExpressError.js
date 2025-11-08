// utils/ExpressError.js
// Custom Error class for Express applications
// Extends the built-in Error class to include a status code
// Usage: throw new ExpressError("Message", 404);
// This can be caught by error-handling middleware in Express
// to provide more informative error responses
// than just the default Error object

class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
