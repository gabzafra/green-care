import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import PageTitle from "../../fontStyles/PageTitle";
import ImageLoader from "../../fontStyles/ImageLoader";
import plantService from "../../services/PlantService";
import userService from "../../services/UserService";
import taskService from "../../services/TaskService";
import geoService from "../../services/GeoService";
import LoadingOverlay from "../../fontStyles/LoadingOverlay";
import FormRange from "../../fontStyles/FormRange";
import StyledButton from "../../fontStyles/StyledButton";
import MutableTextInput from "../../fontStyles/MutableTextInput";
import ModalButtons from "../../fontStyles/ModalButtons";
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
  margin-bottom: 1rem;
`;

export default class PlantDetail extends Component {
  constructor(props) {
    super(props);
    this.plantService = new plantService();
    this.userService = new userService();
    this.taskService = new taskService();
    this.geoService = new geoService();
    this.state = {
      plant: {},
      name: "",
      common_name: "",
      loadingFlag: true,
      waterInterval: 0,
      fertilizerInterval: 0,
      infoToggle: false,
      flavour: props.location.state.flavour
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  toggleInfo = e => {
    e.preventDefault();
    this.setState({ ...this.state, infoToggle: !this.state.infoToggle });
  };

  handleUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);

    this.setState({ ...this.state, loadingFlag: true });
    this.plantService.uploadPlantImage(uploadData).then(
      data => {
        this.setState({
          ...this.state,
          plant: { ...this.state.plant, picture: data.secure_url },
          loadingFlag: false
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  handleUpdate = e => {
    e.preventDefault();
    const { history } = this.props;
    let plant = {
      ...this.state.plant,
      common_name: this.state.common_name,
      name: this.state.name
    };
    let tasks = this.state.plant.tasks.filter(task => task);
    if (tasks.length > 0) {
      
      tasks
        .sort((a, b) => a.type - b.type)
        .forEach(task =>
          task.type === "WATER"
            ? (task.day_interval = this.state.waterInterval)
            : (task.day_interval = this.state.fertilizerInterval)
        );
      delete plant.tasks;
      this.plantService
        .updatePlant(plant)
        .then(() => {
          tasks.forEach(task => this.taskService.updateTask(task));
        })
        .then(() => history.push("/main"));
    } else {
      tasks = [
        {
          begin_day: new Date(),
          day_interval: this.state.waterInterval,
          type: "WATER"
        },
        {
          begin_day: new Date(),
          day_interval: this.state.fertilizerInterval,
          type: "FERTILIZER"
        }
      ];
      console.log(plant);
      
      this.taskService
        .createTasks(tasks)
        .then(tasks => {
          console.log(tasks);
          plant.tasks = [tasks[0].id, tasks[1].id];
          return this.plantService.updatePlant(plant);
        })
        .then(() => history.push("/main"));
    }
  };

  getPlant = () => {
    const {
      match: { params }
    } = this.props;
    this.plantService.getPlantById(params.plantId).then(
      plant => {
        this.setState({
          ...this.state,
          plant,
          name: plant.name,
          common_name: plant.common_name,
          loadingFlag: false,
          waterInterval: plant.tasks[0].day_interval,
          fertilizerInterval: plant.tasks[1].day_interval
        });
      },
      error => {
        const { message } = error;
        console.error(message);
      }
    );
  };

  createNewPlant(user) {
    let locationArr = [40.392351, -3.696842];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        doCreate([position.coords.latitude, position.coords.longitude])
      );
    } else {
      doCreate(locationArr);
    }

    const doCreate = currentPosition => {
      let newTasks = [
        {
          begin_day: new Date(),
          day_interval: 0,
          type: "WATER"
        },
        {
          begin_day: new Date(),
          day_interval: 0,
          type: "FERTILIZER"
        }
      ];

      let newPlant = {
        name: "",
        common_name: "",
        scientific_name: "",
        soils_adaptation: [],
        temperature_minimun: 0,
        shade_tolerance: "",
        year_rain_range: "",
        ph_range: "",
        fertilizer_req: "",
        perennial: true,
        picture: "../images/daisy.jpg",
        tasks: [],
        location: {
          type: "Point",
          coordinates: currentPosition
        }
      };

      this.plantService
        .createPlant(newPlant)
        .then(plant => {
          newPlant = plant;
          return this.taskService.createTasks(newTasks);
        })
        .then(tasks => {
          newPlant.tasks = [tasks[0].id, tasks[1].id];
          return this.plantService.updatePlant(newPlant);
        })
        .then(() => {
          user.locations.push(currentPosition);
          user.plants.push(newPlant.id);
          user.locations = this.geoService.getUserLocationArr(user.locations);
          return this.userService.updateUser(user);
        })
        .then(()=>this.plantService.getPlantById(newPlant.id))
        .then((createdPlant) => {
          console.log(createdPlant);
          this.setState({
            ...this.state,
            plant: { ...createdPlant },
            name: createdPlant.name,
            common_name: createdPlant.common_name,
            loadingFlag: false,
          });
        })
        .catch(error => console.error(error));
    };
  }

  deleteHandle = e => {
    e.preventDefault();
    let user = {...this.props.loggedInUser};
    let plant = this.state.plant;
    this.plantService
        .deletePlant(plant.id)
        .then(()=>this.userService.deleteUserPlant(user, plant))
        .then(() =>this.userService.getUserByIdDeep(user.id))
        .then(newUser =>{
          let userCoords = [];
          newUser.plants.forEach(plant => userCoords.push(plant.location.coordinates));
          newUser.locations = this.geoService.getUserLocationArr(userCoords, 0.002);
          newUser.plants = newUser.plants.reduce((acc, plant)=>{
            acc.push(plant.id);
            return acc
          },[])
          return this.userService.updateUser(newUser);
        })
        .then(() => this.props.history.push("/main"))
        .catch(error => console.error(error));
  };

  componentDidMount() {
    if (this.props.location.state.flavour === "create") {
      this.createNewPlant({ ...this.props.loggedInUser });
    } else {
      this.getPlant();
    }
  }

  render() {
    const { flavour, plant, name, common_name } = this.state;
    return (
      <React.Fragment>
        {this.state.plant && (
          <React.Fragment>
            {this.state.loadingFlag ? (
              <LoadingOverlay />
            ) : (
              <React.Fragment>
                <aside
                  className={this.state.infoToggle ? "show-aside" : ""}
                  onClick={this.toggleInfo}
                >
                  <h2>{plant.common_name}</h2>
                  <p>{plant.scientific_name}</p>
                  <div className="row">
                    <h3>Soil preference</h3>
                    <p>{plant.soils_adaptation.join(" ")}</p>
                  </div>
                  <div className="row">
                    <h3>Temperature minimun</h3>
                    <p>{plant.temperature_minimun}&#176;C</p>
                  </div>
                  <div className="row">
                    <h3>Shade tolerance</h3>
                    <p>{plant.shade_tolerance}</p>
                  </div>
                  <div className="row">
                    <h3>Yearly precipitation rate</h3>
                    <p>{plant.year_rain_range}</p>
                  </div>
                  <div className="row">
                    <h3>pH range</h3>
                    <p>{plant.ph_range}</p>
                  </div>
                  <div className="row">
                    <h3>Fertilizer needs</h3>
                    <p>{plant.fertilizer_req}</p>
                  </div>
                  <div className="row">
                    <h3>Perennial</h3>
                    <p>{plant.perennial ? "Yes" : "No"}</p>
                  </div>
                </aside>

                <PageTitle
                  src="../images/green_care_w.svg"
                  alt="green care logo"
                />
                <FormWrapper>
                  <MutableTextInput
                    name="name"
                    value={name}
                    handleChange={this.handleChange}
                    flavour={flavour}
                    placeholder="Plant name"
                  />
                  <ImageLoader
                    picture={plant.picture}
                    handleUpload={this.handleUpload}
                    flavour={flavour}
                  />
                  <MutableTextInput
                    className="sub-text"
                    name="common_name"
                    value={common_name}
                    handleChange={this.handleChange}
                    flavour={flavour}
                    placeholder="Plant species"
                  />
                  <ButtonsWrapper>
                    <StyledButton img="../images/map_w.svg" />
                    <StyledButton
                      img="../images/info_w.svg"
                      clicked={this.toggleInfo}
                    />
                    <StyledButton img="../images/trash_b_w.svg" clicked={this.deleteHandle}/>
                  </ButtonsWrapper>

                  <FormRange
                    id={"waterSlider"}
                    name={"waterInterval"}
                    value={this.state.waterInterval}
                    handleChange={
                      flavour !== "readonly" ? this.handleChange : () => ""
                    }
                    labelText="Watering interval"
                  />
                  <FormRange
                    id={"fertSlider"}
                    name={"fertilizerInterval"}
                    value={this.state.fertilizerInterval}
                    handleChange={
                      flavour !== "readonly" ? this.handleChange : () => ""
                    }
                    labelText="Fertilizer"
                  />
                </FormWrapper>
                <ModalButtons
                  flavour={flavour}
                  updateHandler={this.handleUpdate}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
