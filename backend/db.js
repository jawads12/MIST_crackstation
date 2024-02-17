const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://sadiqulfw:1234@cluster0.erfiwet.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// db.once("open", async () => {
//   try {
//     const collections = await mongoose.connection.db.collections();

//     for (const collection of collections) {
//       await collection.drop();
//       console.log(`Collection ${collection.collectionName} dropped`);
//     }

//     console.log("All collections dropped");
//   } catch (error) {
//     console.error("Error dropping collections:", error);
//   }
// });

module.exports = db;
