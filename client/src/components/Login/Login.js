import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService';
import './Login.css';
import StyledLogin from './StyledLogin';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/main")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-wrapper">
        <PageTitle src="./images/green_care_w.svg" alt="green care logo"/>
        <img src="./images/leaf_w.svg" alt="gren care"></img>
        <form onSubmit={this.handleLogin}>
          <StyledLogin username={username} password={password} handleChange={this.handleChange} handleLogin={this.handleLogin} placeholder={"User name"}></StyledLogin>
        </form>
      </div>
    )
  }
}