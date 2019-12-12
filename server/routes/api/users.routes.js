const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const Plant = require("../../models/Plant");
const User = require("../../models/User");
const Task = require("../../models/Task");

router.get("/deep/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate({
      path: "plants",
      model: "Plant",
      populate: {
        path: "tasks",
        model: "Task"
      }
    })
    .then(foundUser => res.status(200).json(foundUser))
    .catch(err => res.status(500).json(err));
});

router.get("/all", (req, res, next) => {
  User.find()
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => res.status(500).json(err));
});


router.get("/shallow/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(foundUser => res.status(200).json(foundUser))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).json({ message : "User updated"}))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
