import axios from "axios";

class TaskService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/plants`,
      withCredentials: true
    });
  }

  createTask = (plantId, task) => {
    task.plantId = plantId;
    return this.instance
      .post("/create", task)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  updateTask = (task) => {
    return this.instance
      .put("/update", task)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  deleteTask = (task) => {
    return this.instance
      .put("/delete", task)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default TaskService;
