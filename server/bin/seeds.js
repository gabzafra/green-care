require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Plant = require("../models/Plant");
const Task = require("../models/Task");
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min, max) => Math.random() * (max - min) + min;

const bcryptSalt = 10;

require("../configs/db.config");

function getFakeCoordsArr() {
  return [randomFloat(40, 40.0005), randomFloat(-3.5, -3.5005)];
}

function calcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // earth radius in km
  let dLat = toRad(lat2 - lat1);
  let dLng = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function getUserLocationArr(locations, radius) {
  let resultArr = [];
  if (locations.length > 0) {
    let currentLoc = locations.pop();
    resultArr.push(currentLoc);
    while (locations.length > 0) {
      let nextLoc = locations.pop();
      if (
        calcDistance(currentLoc[0], currentLoc[1], nextLoc[0], nextLoc[1]) >
        radius
      ) {
        resultArr.push(nextLoc);
        currentLoc = nextLoc;
      }
    }
  }
  return resultArr;
}

let flip = true;
let tasks = Array(12)
  .fill()
  .map(() => {
    flip = !flip;
    return {
      begin_day: new Date(),
      day_interval: randomInt(1, 7),
      type: flip ? "WATER" : "FERTILIZER"
    };
  });
let taskArr = [];
let plantRefArr = [];

let plantArr = [
  {
    name: "Steve",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Vaccinium_vitis-idaea_%28flowering%29.jpg",
    scientific_name: "Vaccinium vitis-idaea var. minus",
    common_name: "lingonberry",
    soils_adaptation: ["coarse"],
    temperature_minimun: -52,
    shade_tolerance: "Intolerant",
    ph_range: "4.5 to 6.0",
    year_rain_range: "25cm3 to 701cm3",
    fertilizer_req: "Medium",
    perennial: true,
    location: {
      type: "Point",
      coordinates: getFakeCoordsArr()
    }
  },
  {
    name: "Tammy",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Cowpen_Daisy-_Verbesina_encelioides.jpg",
    scientific_name: "Verbesina encelioides subsp. encelioides",
    common_name: "golden crownbeard",
    soils_adaptation: ["medium", "fine"],
    temperature_minimun: -30,
    shade_tolerance: "Intolerant",
    ph_range: "6.4 to 8.5",
    year_rain_range: "25cm3 to 50cm3",
    fertilizer_req: "Medium",
    perennial: false,
    location: {
      type: "Point",
      coordinates: getFakeCoordsArr()
    }
  },
  {
    name: "Ferdinand",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/1/14/Bouteloua_hirsuta_-_Berlin_Botanical_Garden_-_IMG_8588.JPG",
    scientific_name: "Bouteloua hirsuta var. pectinata",
    common_name: "hairy grama",
    soils_adaptation: ["medium", "coarse"],
    temperature_minimun: -38,
    shade_tolerance: "Intolerant",
    ph_range: "6.0 to 7.2",
    year_rain_range: "17cm3 to 76cm3",
    fertilizer_req: "Low",
    perennial: true,
    location: {
      type: "Point",
      coordinates: getFakeCoordsArr()
    }
  },
  {
    name: "Camilo Sesto",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Brassica_juncea_var._juncea_3.JPG",
    scientific_name: "Brassica juncea",
    common_name: "Brown mustard",
    soils_adaptation: ["medium", "fine"],
    temperature_minimun: -8,
    shade_tolerance: "Intolerant",
    ph_range: "6.0 to 7.2",
    year_rain_range: "76cm3 to 203cm3",
    fertilizer_req: "Low",
    perennial: true,
    location: {
      type: "Point",
      coordinates: getFakeCoordsArr()
    }
  },
  {
    name: "Little guy",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/6/62/Ephedra_torreyana_7.jpg",
    scientific_name: "Ephedra torreyana",
    common_name: "Torrey's jointfir",
    soils_adaptation: ["medium", "coarse"],
    temperature_minimun: -33,
    shade_tolerance: "Intolerant",
    ph_range: "6.5 to 9.5",
    year_rain_range: "20cm3 to 35cm3",
    fertilizer_req: "Low",
    perennial: true,
    location: {
      type: "Point",
      coordinates: getFakeCoordsArr()
    }
  },
  {
    name: "Dad's girl",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Chrysothamnusvicidiflorus.JPG",
    scientific_name: "Chrysothamnus viscidiflorus",
    common_name: "Torrey's jointfir",
    soils_adaptation: ["medium", "coarse"],
    temperature_minimun: -30,
    shade_tolerance: "Intolerant",
    ph_range: "7.0 to 8.5",
    year_rain_range: "17cm3 to 60cm3",
    fertilizer_req: "Low",
    perennial: true,
    location: {
      type: "Point",
      coordinates: getFakeCoordsArr()
    }
  }
];

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("a", bcrypt.genSaltSync(bcryptSalt)),
    picture: "https://res.cloudinary.com/dgn5dpodw/image/upload/v1576512716/greencare/alice.jpg.jpg",
    email: "alice@one.email.com",
    locations: []
  },
  {
    username: "bob",
    password: bcrypt.hashSync("b", bcrypt.genSaltSync(bcryptSalt)),
    picture: "https://res.cloudinary.com/dgn5dpodw/image/upload/v1576513018/greencare/bob.jpg.jpg",
    email: "bob@one.email.com",
    locations: []
  },
  {
    username: "carol",
    password: bcrypt.hashSync("c", bcrypt.genSaltSync(bcryptSalt)),
    picture: "https://res.cloudinary.com/dgn5dpodw/image/upload/v1576505874/greencare/carol.jpg.jpg",
    email: "carol@one.email.com",
    locations: []
  }
];

Task.deleteMany()
  .then(() => {
    return Task.create(tasks);
  })
  .then(tasksCreated => {
    console.log(`${tasksCreated.length} tasks created with the following id:`);
    console.log(tasksCreated.map(u => u._id));

    taskArr = tasksCreated;

    plantArr.forEach(
      plant => (plant.tasks = [taskArr.pop()._id, taskArr.pop()._id])
    );

    return Plant.deleteMany();
  })
  .then(() => {
    return Plant.create(plantArr);
  })
  .then(newPlants => {
    console.log(`${newPlants.length} plants created with the following id:`);
    console.log(newPlants.map(u => u._id));

    plantArr = newPlants;
    plantRefArr = [...plantArr];
    User.deleteMany()
      .then(() => {
        users.forEach(user => {
          user.plants = [plantArr.pop()._id, plantArr.pop()._id];
          console.log(user.username);
          let myPlantsLocations = user.plants.reduce((arr, plantId) => {
            arr.push(
              plantRefArr.find(plant => plant._id === plantId).location
                .coordinates
            );
            return arr;
          }, []);
          user.locations = getUserLocationArr(myPlantsLocations, 0.002);
        });

        return User.create(users);
      })
      .then(usersCreated => {
        console.log(
          `${usersCreated.length} users created with the following id:`
        );
        console.log(usersCreated.map(u => u._id));
      })
      .then(() => {
        mongoose.disconnect();
      })
      .catch(err => {
        mongoose.disconnect();
        throw err;
      });
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
