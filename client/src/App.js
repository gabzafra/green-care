import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Main from "./components/Main/Main";
import PlantDetail from "./components/PlantDetail/PlantDetail";
import AuthService from "./services/AuthService";
import PrivateRoute from "./guards/PrivateRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      user: null,
      flag: false
    };
  }

  setUser = user => {
    this.setState({ ...this.state, user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };

  logout = match => {
    this.authService.logout().then(response => {
      this.setState({
        ...this.state,
        user: null
      });
      match.history.push("/login");
    });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    let { user } = this.state;
    return (
      <div className="App">
        {user && (
          <Switch>
            <Route
              exact
              path="/login"
              render={match => <Login {...match} setUser={this.setUser} />}
            />
            <Route
              exact
              path="/signup"
              render={match => <SignUp {...match} setUser={this.setUser} />}
            />
            <Route exact path="/logout" render={match => this.logout(match)} />
            <PrivateRoute exact path="/main" user={user} component={Main}  />
            <PrivateRoute path="/plant-detail/:plantId" user={user} component={PlantDetail}  />
            <PrivateRoute path="/plant-update/:plantId" user={user} component={PlantDetail}  />
            <PrivateRoute path="/plant/new" user={user} component={PlantDetail}  />
          </Switch>
        )}
        {!user && (
          <Switch>
            <Route
              exact
              path="/login"
              render={match => <Login {...match} setUser={this.setUser} />}
            />
            <Route
              exact
              path="/signup"
              render={match => <SignUp {...match} setUser={this.setUser} />}
            />
            <PrivateRoute exact path="/" user={user} component={Main} redirectPath="/login"/>
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
