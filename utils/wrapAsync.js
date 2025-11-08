// A utility function to wrap async route handlers and pass errors to Express error handler
// This helps to avoid repetitive try-catch blocks in each async route handler
// Usage: wrapAsync(async (req, res, next) => { ... })
// If an error occurs, it will be caught and passed to next()
// which triggers the error-handling middleware in Express

module.exports = (fn)=>{
  return (req, res, next) =>{
    fn(req, res, next).catch(next);
  };
};