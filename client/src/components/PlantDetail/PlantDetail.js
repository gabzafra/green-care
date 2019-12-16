import React, { Component } from "react";
import "./PlantDetail.css";
import PageTitle from "../../fontStyles/PageTitle";
import CloseBtn from "../../fontStyles/StyledCloseBtn";
import plantService from "../../services/PlantService";

export default class PlantDetail extends Component {
  constructor(props) {
    super(props);
    this.plantService = new plantService();
    this.state = {
      plant: null
    };
  }

  getPlant = () => {
    const {
      match: { params }
    } = this.props;
    this.plantService.getPlantById(params.plantId).then(
      plant => {
        this.setState({ ...this.state, plant });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  componentDidMount() {
    this.getPlant();
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle src="./images/green_care_w.svg" alt="green care logo" />
      </React.Fragment>
      
    );
  }
}
