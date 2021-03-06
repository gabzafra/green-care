import axios from "axios";

class PlantService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/plants`,
      withCredentials: true
    });
  }

  getPlantById = plantId => {
    return this.instance
      .get(`/${plantId}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  getUserPlants = userId => {
    return this.instance
      .get(`/user/${userId}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  createPlant = plant => {
    return this.instance
      .post("/create", plant)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deletePlant = plantId => {
    return this.instance
      .delete(`/delete/${plantId}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  updatePlant = plant => {
    return this.instance
      .put(`/update`, plant)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  uploadPlantImage = picture => {
    return this.instance
      .post("/upload", picture)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default PlantService;
