import axios from "axios";

class TrefService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_TREF_URL}?token=${process.env.REACT_APP_TREF_TOKEN}/`,
      withCredentials: true
    });
  }
  //https://trefle.io/api/plants/?token=VlZkR1N3aVRudTVhV1NmSnlUaTNKUT09&common_name=Canadian%20serviceberry
  getByName = name=> {
    return this.instance
      .get(`/&common_name=${name}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };
}

export default TrefService;
