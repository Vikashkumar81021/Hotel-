// const mongoose = require("mongoose");

// const mongoURL = "mongodb://localhost:27017/CRUD";

// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("connected", () => {
//   console.log("Connected to mongodb server");
// });
// db.on("error", (err) => {
//   console.log("MongoDB connection error !", err);
// });
// db.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });

// //export the db connection
// module.exports = db;

const mongoose = require("mongoose");
const mongoURL = process.env.MongoURL
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongoDB is connected");
});
db.on("error", (error) => {
  console.log("mongoDB connection error", error);
});
db.on("disconnected", () => {
  console.log("mongoDB not connected");
});
module.exports = db;
