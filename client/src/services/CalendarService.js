import axios from "axios";

class CalendarService {
    constructor() {
        this.instance = axios.create({
          baseURL: `${process.env.REACT_APP_WEATHER_URL}?token=${process.env.REACT_APP_WEATHER_TOKEN}`,
          withCredentials: true,
          'Content-Type': 'application/json'
        });
      }
      tryMe = (lat,lng)=> {
        return this.instance
          .get(`daily?&lat=${lat}&lon=${lng}`)
          .then(res => Promise.resolve(res.data))
          .catch(error => console.error(error));
      };
}

export default CalendarService;