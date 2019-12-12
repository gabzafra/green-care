const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../../models/User");
const Plant = require("../../models/Plant");
const Task = require("../../models/Task");

// router.get('/user/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id).populate("plants")
  .then(foundUser=>res.status(200).json(foundUser.plants))
  .catch(err=>res.status(500).json(err))
});

router.get("/plant/:id", (req, res, next) => {
  const { id } = req.params;
  Plant.findById(id).populate("tasks")
  .then(foundPlant=>res.status(200).json(foundPlant))
  .catch(err=>res.status(500).json(err))
});

router.post("/create", (req, res, next) => {
  Plant.create(req.body)
  .then(newPlant=>res.status(200).json(newPlant))
  .catch(err=>res.status(500).json(err))
});

router.post("/create/task", (req, res, next) => {
  const { plantId, begin_day, day_interval, type} = req.body;
  const newTask = new Task({
    begin_day: { type: Date, required: true },
    day_interval: { type: Number, required: true },
    type: { type: String, enum: ["WATER", "FERTILIZER"], required: true }
  });


  Task.create(newTask).then(result => {
    newTaskInfo = result;
    Job.findByIdAndUpdate(req.body.jobId, {
      $push: { tasks: result._id }
    }).then(() => {
      res.json(newTaskInfo);
    });
  });
});

// router.delete("/delete/:id", (req, res, next) => {
//   const { id } = req.params;
//   Plant.create(req.body)
//   .then(newPlant=>res.status(200).json(newPlant))
//   .catch(err=>res.status(500).json(err))
// });

module.exports = router;
