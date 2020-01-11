import axios from "axios";

class CalendarService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_WEATHER_URL}`
    });
  }

  getForecast = (lat, lng) => {
    return this.instance
      .get(
        `daily/?key=${process.env.REACT_APP_WEATHER_TOKEN}&lat=${lat}&lon=${lng}`
      )
      .then(res => Promise.resolve(res.data))
      .catch(error => console.error(error));
  };

  getIcon = iconCode => {
    switch (iconCode) {
      case 700:
      case 711:
      case 721:
      case 731:
      case 803:
      case 804:
        return "cloud";
      case 800:
      case 801:
      case 802:
        return "sun";
      case 232:
      case 511:
      case 600:
      case 601:
      case 602:
      case 621:
      case 622:
      case 751:
        return "snow";
      default:
        return "rain";
    }
  };
}

export default CalendarService;
