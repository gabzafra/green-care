import axios from 'axios';

class UserService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/users`,
      withCredentials: true    
    })
  }

  getUsers = () => {
    return this.instance.get(`/all`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  getUserByIdDeep = (id) => {
    return this.instance.get(`/deep/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  getUserByIdShallow = (id) => {
    return this.instance.get(`/shallow/${id}`)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateUser = (user) => {
    return this.instance.put('/update',user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateUserProfile = (user) => {
    return this.instance.put('/update-profile',user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  deleteUserPlant= (user, plant) => {
    let payload = {user:user, plant: plant}
    return this.instance.put('/deletePlant',payload)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  uploadUserImage = (picture) => {
    return this.instance.post('/upload', picture)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }
}

export default UserService;