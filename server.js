const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const { router, setupSocket } = require('./routes/index');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware: CORS for Express routes
app.use(cors());

// Serve static files from the 'routes/views' directory
app.use(express.static(__dirname + '/routes/views'));

// Set up routes
app.use('/', router);

// Set up Socket.IO
setupSocket(server);

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
