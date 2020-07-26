// Initialize express and create an instance for it
require("dotenv").config();
var express = require("express");
var app = express();

/***************************
 * Import the controllers *
 ***************************/
var user = require("./controllers/usercontroller");
var review = require("./controllers/reviewcontroller");

// We need to pull in the db before we do the routes
var sequelize = require("./db");

// We need to parse through the body of the application to retrieve data through requests
var bodyParser = require("body-parser");

// Sync all the defined models to the database
sequelize.sync(); // tip: {force: true} for resetting table data
app.use(bodyParser.json());

// We need out middleware for handling requests
app.use(require("./middleware/headers"));

// Check and see if server is working (^:;
app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}`);
});

app.use("/api/test", function (req, res) {
  res.send("This is data from the /api/test endpoint. It's from the server");
});
/********************
 * Exposed routes *
 ********************/
app.use("/user", user);

/**********************
 * Protected routes *
 **********************/
// Import the authentication
app.use(require("./middleware/validatesession"));

// Now add the routes that will need authentication - reviews
app.use("/reviews", review);
