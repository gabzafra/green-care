import React, { Component } from 'react'
import PageTitle from '../../sharedComponents/PageTitle'
import AuthService from '../../services/AuthService';
import './Login.css';
import StyledLogin from './StyledLogin';
import LeafLogo from '../../sharedComponents/Leaf';


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
    let apiToken = null;
    e.preventDefault()
    this.authService.getTrefleToken(process.env.REACT_APP_LOCAL_URL)
    .then(token=>{
      apiToken = token;
      return this.authService.login(this.state)
    })
    .then(
      (user) => {
        user && (user.token = apiToken);
        setUser(user);
        history.push("/main");
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
        <PageTitle controls={false}/>
        <LeafLogo />
        <form onSubmit={this.handleLogin}>
          <StyledLogin username={username} password={password} handleChange={this.handleChange} handleLogin={this.handleLogin} placeholder={"User name"}></StyledLogin>
        </form>
      </div>
    )
  }
}