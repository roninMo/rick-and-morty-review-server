var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

/***********************************
 ** Create user endpoint: starter **
 **********************************/
// All passwords are Admin1
router.post("/create", (req, res) => {
  var username = req.body.user.username;
  var email = req.body.user.email;
  var password = req.body.user.password;

  User.create({
    username: username,
    email: email,
    passwordhash: bcrypt.hashSync(password, 10),
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        user: user,
        message: "created user!",
        sessionToken: token,
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

/***********************************
 ** Create sign in endpoint: whew **
 **********************************/
router.post("/login", (req, res) => {
  User.findOne({ where: { username: req.body.user.username } }).then(
    function (user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, function (
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "successfully authenticated",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Bad Gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "Internal server error" });
      }
    },
    function (err) {
      res.status(501).send({ error: "Not Implemented" });
    }
  );
});

/***********************************
 ** Get a specific user by id **
 **********************************/
router.get("/search/:id", (req, res) => {
  var data = req.params.id;

  User.findOne({ where: { id: data } })

    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err }));
});

/***********************************
 ** Get a specific user **
 **********************************/
router.post("/search", (req, res) => {
  var name = req.body.user.username;

  User.findAll({ where: { username: name } })

    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err }));
});

/***********************************
 ** Get all users **
 **********************************/
router.get("/searchAll", (req, res) => {
  User.findAll()

    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
