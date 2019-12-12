import React from 'react';
import './App.css';
//import TodoService from './services/TodoService';
//import TodoList from './components/TodoList/TodoList';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import Main from './components/Main/Main';
import AuthService from './services/AuthService';
import PrivateRoute from './guards/PrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.todoService = new TodoService();
    this.authService = new AuthService();
  }

  state = {
    user: null,
    flag: false
  }

  setUser = (user) => {
    this.setState({ ...this.state, user })
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
          },
          (error) => {
            
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
        })
    }
  }

  logout = (match) => {
    this.authService.logout()
    .then((response)=>{
      this.setState({
        ...this.state,
        user : null
      });
      match.history.push("/")
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    this.fetchUser()
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {user && <Switch>
            {this.state.flag && <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} /> } 
            <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
            <Route exact path="/logout" render={(match) => this.logout(match)} />
            <PrivateRoute exact path="/main" user={user} component={Main}/>
          </Switch> }
          {!user && <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />  
            <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
            <PrivateRoute exact path="/main" user={user} component={Main} redirectPath={"/login"}/>
          </Switch> }
        </header>
      </div>
    );
  }
}

export default App;