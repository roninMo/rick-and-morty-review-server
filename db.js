const Sequelize = require("sequelize");

// Make an instance of sequelize to create a sequelize object se we can establish a connection to the server
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// We're using the sequelize var to access methods such as authenticate
// In this case we're using authenticate to return a promise if it successfully connects
sequelize.authenticate().then(
  function () {
    // Fire a function if it connects successfully
    console.log("Connected to the workoutlog postgres database");
  },
  function (err) {
    // Fire an error if there are any errors
    console.log(`Error: ${err}`);
  }
);

module.exports = sequelize;
