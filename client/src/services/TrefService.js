import axios from "axios";

class TrefService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_TREF_URL}`
    });
  }
  //https://trefle.io/api/plants/?token=VlZkR1N3aVRudTVhV1NmSnlUaTNKUT09&common_name=Canadian%20serviceberry

  getByName = (name,token) => {
    return this.instance
      .get(`?token=${token}&common_name=${name}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  getById = (id,token) => {
    return this.instance
      .get(`${id}?token=${token}`)
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  }
}

export default TrefService;
