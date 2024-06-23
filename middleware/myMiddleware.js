// myMiddleware.js

const myMiddleware = (req, res, next) => {
    // Middleware logic
    console.log('Custom middleware triggered');
    // Example: Set custom headers
    res.setHeader('X-Custom-Header', 'Hello from custom middleware');
    // Continue to the next middleware/route handler
    next();
  };
  
  module.exports = myMiddleware;
  