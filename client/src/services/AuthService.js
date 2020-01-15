import axios from 'axios';

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true    
    })
  }

  getTrefleToken = clientUrl => {
    return this.instance.post('/tref', {url:clientUrl})
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  signup = (user) => {
    return this.instance.post('/signup', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  login = (user) => {
    return this.instance.post('/login', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => {/*console.error(error)*/})
  }

  loggedInUser = () => {
    return this.instance.get('/loggedin')
    .then(res => Promise.resolve(res.data))
    .catch(error => {/*console.error(error)*/})
  }

  logout = () => {
    return this.instance.post('/logout')
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(error => console.error(error))
  }

  upload = (picture) => {
    return this.instance.post('/upload', picture)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }
}

export default AuthService;