const todoModel = require('../models/todoModel');

let changeStream = null;

async function handleClientConnection(socket) {
  console.log('Client connected');

  try {
    // Send initial data
    const initialData = await todoModel.getTodos();
    socket.emit('initialData', initialData);

    // Connect to the database
    const db = await todoModel.connectToDatabase();
    const collection = db.collection('Todo');

    // Listen for changes in the collection
    if (!changeStream) {
      changeStream = collection.watch();

      changeStream.on('change', (change) => {
        console.log('Change detected:', change);
        socket.emit('change', change); // Emit change to connected clients
      });

      changeStream.on('error', (error) => {
        console.error('Change stream error:', error);
        // Handle error (optional)
      });
    }

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      if (changeStream) {
        changeStream.close();
        changeStream = null; // Reset changeStream to allow re-creation on next connection
      }
    });
  } catch (error) {
    console.error('Error in Socket.IO connection:', error);
    // Handle error (optional)
  }
}

module.exports = {
  handleClientConnection,
};
