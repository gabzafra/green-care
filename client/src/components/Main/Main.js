import React, { Component } from "react";
import "./Main.css";
import PageTitle from "../../fontStyles/PageTitle";
import plantService from "../../services/PlantService";
import taskService from "../../services/TaskService";
import PlantCard from "../PlantCard/StyledPlantCard";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.plantService = new plantService();
    this.taskService = new taskService();
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
    let plant = this.state.plants.find(plant => plant.id === e.target.id);
    this.plantService.deletePlant(plant.id).then(
      () => {
        this.updatePlants();
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  componentDidMount() {
    this.updatePlants();
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle src="./images/green_care_w.svg" alt="green care logo" />
        {this.state.plants.map(plant => (
          <PlantCard
            key={plant.id}
            plant={{ ...plant, deletePlant: this.deletePlant }}
          ></PlantCard>
        ))}
      </React.Fragment>
    );
  }
}
