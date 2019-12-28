import React, { Component } from "react";
import ImageLoader from "../../sharedComponents/ImageLoader";
import ModalButtons from "../../sharedComponents/ModalButtons";
import userService from "../../services/UserService";
import capitalize from "../../globalStyles/utils";
import LoadingOverlay from "../../sharedComponents/LoadingOverlay";
import "./UserDetail.css";
import { Link } from "react-router-dom";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.userService = new userService();
    this.state = {
      name: null,
      loadingFlag: true,
      email: "",
      plants: null,
      picture: null
    };
  }

  componentDidMount() {
    this.userService
      .getUserByIdDeep(this.props.location.state.id)
      .then(user => {
        this.setState({
          ...this.state,
          name: user.username,
          plants: [...user.plants],
          email: user.email,
          loadingFlag: false,
          picture: user.picture
        });
      });
  }

  

  render() {
    const { name, email, picture, plants } = this.state;
    const userId = this.props.location.state.id;
    return (
      <React.Fragment>
        {this.state.loadingFlag ? (
          <LoadingOverlay />
        ) : (
          plants && (
            <div className="big-div">
              <h1>{capitalize(name)}</h1>
              <ImageLoader
                picture={picture}
                handleUpload={() => ""}
                flavour="readonly"
              />
              <h2 className="email-row">{email}</h2>
              <div className="small-div">
                {plants.splice(0, 3).map((plant, idx) => (
                  <Link
                  key={idx}
                    to={{
                      pathname: `/plant-detail/${plant.id}`,
                      state: {
                        flavour: "readonly",
                        sourceUserId: `${userId}`
                      }
                    }}
                  >
                    <ImageLoader               
                      picture={plant.picture}
                      handleUpload={() => ""}
                      flavour="readonly"
                      size="120"
                    />
                  </Link>
                ))}
              </div>
              <ModalButtons
                updateHandler={() => ""}
                flavour="readonly"
              />
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}
