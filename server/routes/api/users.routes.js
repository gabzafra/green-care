const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../../models/User");
const uploader = require('../../configs/cloudinary.config')

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
    .then(foundUser => {
      res.status(200).json(foundUser);
    })
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

router.put("/update", (req, res, next) => {
  const { id } = req.body;
  console.log(req.body.plants);
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).json({ message : "User updated"}))
    .catch(err => res.status(500).json(err));
});

router.delete("/deletePlant", (req, res, next) => {
  const { user, plant } = req.body;
  User.findByIdAndUpdate(user.id, {$pull: { plants: plant.id }})
    .then(() => res.status(200).json({ message : "User plant deleted"}))
    .catch(err => res.status(500).json(err));
});


router.post('/upload', uploader.single('picture'), (req, res) => {
  if(req.file){
    res.status(200).json({secure_url: req.file.secure_url })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})



module.exports = router;
