import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile"
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

  logout = () => {
    this.authService.logout().then(response => {
      this.setState({
        ...this.state,
        user: null
      });
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
            <PrivateRoute exact path="/main" user={user} component={Main} logoutHandler={this.logout}/>
            <PrivateRoute path="/plant-detail/:plantId" user={user} component={PlantDetail} logoutHandler={this.logout} />
            <PrivateRoute path="/plant-update/:plantId" user={user} component={PlantDetail} logoutHandler={this.logout} />
            <PrivateRoute path="/plant/new" user={user} component={PlantDetail} logoutHandler={this.logout} />
            <PrivateRoute path="/profile" user={user} component={Profile} logoutHandler={this.logout} />
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
            <Route
              path="/"
              render={match => <Login {...match} setUser={this.setUser} />}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
