const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const Plant = require("../../models/Plant");
const User = require("../../models/User");
const Task = require("../../models/Task");
const uploader = require("../../configs/cloudinary.config");

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Plant.findById(id)
    .populate("tasks")
    .then(foundPlant => res.status(200).json(foundPlant))
    .catch(err => res.status(500).json(err));
});

router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate("plants")
    .then(foundUser => res.status(200).json(foundUser.plants))
    .catch(err => res.status(500).json(err));
});

router.post("/create", (req, res, next) => {
  Plant.create(req.body)
    .then(newPlant => res.status(200).json(newPlant))
    .catch(err => res.status(500).json(err));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id: plantId } = req.params;
  Plant.findById(plantId)
    .then(plant => {
      return Task.deleteMany({ _id: { $in: plant.tasks }})
    })
    .then(()=> Plant.findByIdAndDelete(plantId))
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
});

router.put("/update", (req, res, next) => {
  Plant.findByIdAndUpdate(req.body.id, req.body)
    .then(newPlant => res.status(200).json(newPlant))
    .catch(err => res.status(500).json(err));
});

router.post("/upload", uploader.single("picture"), (req, res) => {
  if (req.file) {
    res.status(200).json({ secure_url: req.file.secure_url });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
