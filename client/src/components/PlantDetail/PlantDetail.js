import React, { Component } from "react";
import PageTitle from "../../fontStyles/PageTitle";
import ImageLoader from "../../fontStyles/ImageLoader";
import plantService from "../../services/PlantService";
import LoadingOverlay from "../../fontStyles/LoadingOverlay";
import FormRange from "../../fontStyles/FormRange";
import StyledButton from "../../fontStyles/StyledButton";
import MutableTextInput from "../../fontStyles/MutableTextInput";
import styled from "styled-components";
import "./PlantDetail.css";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
`;

export default class PlantDetail extends Component {
  constructor(props) {
    super(props);
    this.plantService = new plantService();
    this.state = {
      plant: null,
      loadingFlag: false,
      waterInterval: 7,
      fertilizerInterval: 7
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);
    this.setState({ ...this.state, loadingFlag: true });
    this.plantService.uploadPlantImage(uploadData).then(
      data => {
        this.setState({
          ...this.state,
          plant: { picture: data.secure_url },
          loadingFlag: false
        });
      },
      error => {
        console.error(error);
      }
    );
  };

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
    const plant = this.state.plant;
    return (
      <React.Fragment>
        {this.state.plant && (
          <React.Fragment>
            {this.state.loadingFlag && <LoadingOverlay />}
            <PageTitle src="../images/green_care_w.svg" alt="green care logo" />
            <aside className="extend-info"></aside>
            <FormWrapper>
              <MutableTextInput
                name="name"
                value={plant.name}
                handleChange={this.handleChange}
                job="readonly"
                placeholder="Plant name"
              />
              <ImageLoader
                picture={plant.picture}
                handleUpload={this.handleUpload}
              />
              <MutableTextInput
                className="sub-text"
                name="common_name"
                value={plant.common_name}
                handleChange={this.handleChange}
                job="readonly"
                placeholder="Plant species"
              />
              <ButtonsWrapper>
                <StyledButton img="../images/map_w.svg" />
                <StyledButton img="../images/info_w.svg" />
                <StyledButton img="../images/trash_b_w.svg" />
              </ButtonsWrapper>

              <FormRange
                id={"waterSlider"}
                name={"waterInterval"}
                value={this.state.waterInterval}
                handleChange={this.handleChange}
                labelText="Watering interval"
              />
              <FormRange
                id={"fertSlider"}
                name={"fertilizerInterval"}
                value={this.state.fertilizerInterval}
                handleChange={this.handleChange}
                labelText="Fertilizer"
              />
            </FormWrapper>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
