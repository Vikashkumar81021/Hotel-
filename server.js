require("dotenv").config();
const express = require("express");

const passport = require("./auth");

const bodyParser = require("body-parser");

const db = require("./db");
const app = express();
PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.use(passport.initialize());
app.get("/", (req, res) => {
  res.send("welcome to my hotel");
});

//import routes file

//Person-routes
const personRoutes = require("./Routes/personRoutes");
//use the routers
app.use("/person", personRoutes);

//menuItem-routes
const menuRoutes = require("./Routes/menuitemsRoutes");
//use the router
app.use("/menu", localAuthMiddleware, menuRoutes);
const userRoutes = require("./Routes/userRoutes");
app.use("/user", userRoutes);
//register
const registerRoutes = require("./Routes/RegisterRouter");
const Person = require("./models/Person-Model");
app.use("/register", registerRoutes);

app.listen(PORT, () => {
  console.log(`Server is listen ${PORT}`);
});
