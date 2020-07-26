// Server dependencies
var express = require("express");
var router = express.Router();
var sequelize = require("../db");
// Controller dependencies
var User = sequelize.import("../models/user.js");
var Review = sequelize.import("../models/reviews.js");
var validateSession = require("../middleware/validatesession");

/*************************************
 * Get all USER reviews from the server
 *************************************/
router.get("/reviews", validateSession, (req, res) => {
  var userid = req.params.id;

  Review.findAll({
    where: { id: userid },
  })

    // if success ->
    .then((data) => res.status(200).json(data))
    // if failurino ->
    .catch((err) => res.status(500).json({ error: err }));
});

/**********************************
 * Get ALL reviews from the server
 **********************************/
router.get("/allreviews", validateSession, (req, res) => {
  Review.findAll()

    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(500).json({ error: err }));
});

/*****************************
 * Get a single user item
 *****************************/
router.get("/review/:id", validateSession, (req, res) => {
  var data = req.params.id; // id from the route

  Review.findOne({ where: { id: data } })

    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(500).json({ error: err }));
});

/**********************************
 * Get all reviews of a single user
 **********************************/
router.get("/userall/", validateSession, (req, res) => {
  var userid = req.user.id; // put the id of the user (from localstorage of current user in session) to look for all reviews where userid = the ownerid

  Review.findAll({ where: { reviewerid: userid } })

    .then((reviews) => res.status(200).json(reviews))
    .catch((err) => res.status(500).json({ error: err }));
});

/*************************************
 * Create a review onto the server
 *************************************/
router.post("/newReview", validateSession, (req, res) => {
  var userid = req.user.id;

  const userReview = {
    reviewerid: userid,
    reviewerName: req.body.reviews.reviewerName,
    review: req.body.reviews.review,
    characterImage: req.body.reviews.characterImage,
    characterName: req.body.reviews.characterName,
    characterGender: req.body.reviews.characterGender,
    characterSpecies: req.body.reviews.characterSpecies,
    characterStatus: req.body.reviews.characterStatus,
  };

  Review.create(userReview)
    .then((newReview) => res.status(200).json(newReview))
    .catch((err) => res.status(500).json({ error: err }));
});

/*********************************
 * Update an individual's review
 *********************************/
router.put("/update/:id", validateSession, (req, res) => {
  var data = req.params.id; // id from the route
  var userid = req.user.id;

  Review.update(
    { review: req.body.review },
    { where: { id: data, reviewerid: userid } }
  )

    .then((updatedReview) => res.status(200).json(updatedReview))
    .catch((err) => res.status(500).json({ error: err }));
});

/*****************************
 * Delete a user review
 *****************************/
router.delete("/delete/:id", validateSession, (req, res) => {
  var data = req.params.id; // id from the route!
  var userid = req.user.id;

  Review.destroy({ where: { id: data, reviewerid: userid } })

    .then((data) =>
      res.status(200).send("Successfully removed review: ").json(data)
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;

// force install fsevents sorta works with this:
//     "fsevents": "^2.0.7",
