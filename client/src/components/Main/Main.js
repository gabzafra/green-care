import React, { Component } from "react";
import "./Main.css";
import PageTitle from "../../sharedComponents/PageTitle";
import plantService from "../../services/PlantService";
import taskService from "../../services/TaskService";
import userService from "../../services/UserService";
import geoService from "../../services/GeoService";
import PlantCard from "../PlantCard/StyledPlantCard";
import ModalButtons from "../../sharedComponents/ModalButtons";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.plantService = new plantService();
    this.taskService = new taskService();
    this.userService = new userService();
    this.geoService = new geoService();
    this.state = {
      plants: []
    };
  }

  updatePlants = () => {
    this.plantService.getUserPlants(this.props.loggedInUser.id).then(
      plants => {
        this.setState({ ...this.state, plants });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  deletePlant = e => {
    e.preventDefault();
    let user = { ...this.props.loggedInUser };
    let plant = this.state.plants.find(plant => plant.id === e.target.id);
    this.plantService
      .deletePlant(plant.id)
      .then(() => this.userService.deleteUserPlant(user, plant))
      .then(() => this.userService.getUserByIdDeep(user.id))
      .then(newUser => {
        let userCoords = [];
        newUser.plants.forEach(plant =>
          userCoords.push(plant.location.coordinates)
        );
        newUser.locations = this.geoService.getUserLocationArr(
          userCoords,
          0.002
        );
        newUser.plants = newUser.plants.reduce((acc, plant) => {
          acc.push(plant.id);
          return acc;
        }, []);
        return this.userService.updateUser(newUser);
      })
      .then(() => this.updatePlants())
      .catch(error => console.error(error));
  };

  componentDidMount() {
    this.updatePlants();
  }

  render() {
    return (
      <React.Fragment>
        <div className="fixed-top-aux-padding">
          <div className="fixed-controls up">
            <PageTitle
              logoutHandler={this.props.handleLogout}
              controls={true}
            />
          </div>
          <div className="cards-wrapper">
            {this.state.plants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={{ ...plant, deletePlant: this.deletePlant }}
              ></PlantCard>
            ))}
          </div>
          <div className="fixed-controls down">
            <ModalButtons flavour="main" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
