var express = require("express");
var router = express.Router();

const Users = require("../models/Users");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json({
        confirmation: "failed",
        message: err.message
      });
    });
});
router.post("/", function(req, res) {
  Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
    .then(item => {
      res.json("Added");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  res.send("user created");
});
// Get Specific
router.route("/:id").get(function(req, res) {
  var id = req.params.id;
  Users.findById(id, function(err, item) {
    res.json(item);
  });
});

//  Update Specific
router.route("/:id").put(function(req, res) {
  Users.findById(req.params.id, function(err, item) {
    console.log(item);
    item = Object.assign(item, req.body);
    item
      .save()
      .then(item => {
        res.json("Updated");
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
  });
});

router.route("/:id").delete(function(req, res) {
  Users.findByIdAndRemove({ _id: req.params.id }, function(err, item) {
    if (err) res.json(err);
    else res.json("Deleted");
  });
});

module.exports = router;
