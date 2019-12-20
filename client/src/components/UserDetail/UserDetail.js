import React, { Component } from "react";
import ImageLoader from "../../fontStyles/ImageLoader";
import ModalButtons from "../../fontStyles/ModalButtons";
import userService from "../../services/UserService";
import capitalize from "../../globalStyles/utils";
import LoadingOverlay from "../../fontStyles/LoadingOverlay";

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
    return (
      <React.Fragment>
        {this.state.loadingFlag ? (
          <LoadingOverlay />
        ) : (
          plants && (
            <React.Fragment>
              <h1>{capitalize(name)}</h1>
              <ImageLoader
                picture={picture}
                handleUpload={() => ""}
                flavour="readonly"
              />
              <h2>{email}</h2>
              {plants.map((plant, idx) => (
                <ImageLoader
                  key={idx}
                  picture={(plant.picture)}
                  handleUpload={() => ""}
                  flavour="readonly"
                />
              ))}

              <ModalButtons updateHandler={() => ""} flavour="readonly" />
            </React.Fragment>
          )
        )}
      </React.Fragment>
    );
  }
}
