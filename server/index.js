// // At the beginning of your index.js or main file
// const EventEmitter = require("events");
// EventEmitter.defaultMaxListeners = 15; // Set an appropriate number based on your application's needs

// // ... rest of your code

// // For example, if you are using a Bus instance
// const bus = new EventEmitter();
// bus.setMaxListeners(15); // Adjust the number based on your needs

// const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
