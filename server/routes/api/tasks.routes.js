const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const Plant = require("../../models/Plant");
const Task = require("../../models/Task");
const uploader = require('../../configs/cloudinary.config')

router.post("/create/task", (req, res, next) => {
  let newTaskInfo;
  const { plantId, begin_day, day_interval, type} = req.body;
  const newTask = new Task({
    begin_day: begin_day,
    day_interval: day_interval,
    type: type
  });
  
  newTask.save().then(task => {
    newTaskInfo = task;
    return Plant.findByIdAndUpdate( plantId,{ $push: { tasks: task._id } } );
  })
  .then(() => res.status(200).json(newTaskInfo))
  .catch(err => res.status(500).json(err)) 
});

router.delete("/delete/task", (req, res, next) => {
  const { plantId, taskId } = req.body;
  Plant.findByIdAndUpdate(plantId,{$pull: { tasks: taskId }})
  .then(() => Task.findByIdAndDelete(taskId))
  .then(result=>res.status(200).json(result))
  .catch(err=>res.status(500).json(err))
});

router.post('/upload', uploader.single('picture'), (req, res) => {
  if(req.file){
    res.status(200).json({secure_url: req.file.secure_url })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = router;