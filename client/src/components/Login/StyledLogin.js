import React from "react";
import styled from "styled-components";
import colors from "../../globalStyles/colors";
import { Link } from "react-router-dom";

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 100vw;
  height: 50vh;
  margin: 0 auto;
  .button-box {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    button {
      background: ${colors.white};
      color: ${colors.green};
      font-size: 1.2rem;
      font-weight: 600;
      border: none;
      border-radius: 25px;
      height: 50px;
      min-width: 230px;
      max-width: 350px;
      padding: 10px;
      margin: .5rem;
      box-sizing: border-box;
      input {
        color: ${colors.white};
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
    .btn-green {
      background: ${colors.green};
      border: 1px solid ${colors.white};
    }
  }
`;

const StyledInput = styled.input`
  color: ${colors.gray};
  font-size: 1.2rem;
  border: none;
  border-radius: 22px;
  height: 50px;
  min-width: 230px;
  max-width: 350px;
  padding: 10px;
  margin: 5px;
  box-sizing: border-box;
  ::placeholder {
    color: ${colors.gray};
  }
`;

const StyledLabel = styled.label`
  font-family: "Encode Sans";
  font-weight: 400;
  font-size: 2em;
  color: ${colors.white};
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Login = props => {
  const { username, password, handleChange, placeholder } = props;
  return (
    <StyledLogin>
      <StyledLabel htmlFor="username">User name: </StyledLabel>
      <StyledInput
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <StyledLabel htmlFor="password">Password: </StyledLabel>
      <StyledInput
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <div className={"button-box"}>
        <button className={"btn-green"}>
          <input type="submit" value="Enter" />
        </button>
        <Link to={{pathname:"/signup"}}><button>New user</button></Link>
        
      </div>
    </StyledLogin>
  );
};

export default Login;
