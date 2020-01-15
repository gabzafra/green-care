const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../../models/User");
const uploader = require("../../configs/cloudinary.config");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/deep/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
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

router.get("/all", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find()
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => res.status(500).json(err));
});

router.get("/shallow/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(foundUser => res.status(200).json(foundUser))
    .catch(err => res.status(500).json(err));
});

router.put("/update", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id } = req.body;
  console.log(req.body.plants);
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).json({ message: "User updated" }))
    .catch(err => res.status(500).json(err));
});

router.put("/update-profile", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id, current_pass, new_pass, repeat_pass } = req.body;
  let newUser = {...req.body};
  User.findById(id)
    .then(oldUser => {
      if (current_pass !== new_pass && new_pass === repeat_pass) {
        if (bcrypt.compareSync(current_pass, oldUser.password)) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(new_pass, salt);
          newUser = { ...newUser, password: hashPass };
        }
      }
      return User.findByIdAndUpdate(id, newUser);
    })
    .then(() => res.status(200).json({ message: "User updated" }))
    .catch(err => res.status(500).json(err));
});

router.delete("/deletePlant", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { user, plant } = req.body;
  User.findByIdAndUpdate(user.id, { $pull: { plants: plant.id } })
    .then(() => res.status(200).json({ message: "User plant deleted" }))
    .catch(err => res.status(500).json(err));
});

router.post("/upload", ensureLogin.ensureLoggedIn(), uploader.single("picture"), (req, res) => {
  if (req.file) {
    res.status(200).json({ secure_url: req.file.secure_url });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
