import React from "react";
import styled from "styled-components";
import colors from "../../globalStyles/colors";
import { Link } from "react-router-dom";

const StyledSignup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100vw;
  height: 50vh;
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

    .btn-red {
      background: ${colors.red};
      border: 1px solid ${colors.white};
      color: ${colors.white};
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

const StyledError = styled.p`
  font-family: "Roboto";
  font-weight: 300;
  font-size: 1em;
  font-style: italic;
  color: ${colors.white};
  background-color: ${colors.red} ;
  padding: 2px 5px;
  border-radius: 5px;
`;

const Signup = props => {
  const { username, password, passwordR, handleChange, placeholder, error } = props;
  return (
    <StyledSignup>
      <StyledLabel htmlFor="username">New user name: </StyledLabel>
      <StyledInput
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <StyledLabel htmlFor="password">New password: </StyledLabel>
      <StyledInput
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <StyledLabel htmlFor="passwordR">Repeat password: </StyledLabel>
      <StyledInput
        type="password"
        name="passwordR"
        value={passwordR}
        onChange={handleChange}
      />
      {error && <StyledError>{error}</StyledError>}
      <div className={"button-box"}>
        <button className={"btn-green"}>
          <input type="submit" value="Create User" />
        </button>
        <Link to={{pathname:"/login"}}>
          <button className={"btn-red"}>Cancel</button>
        </Link>  
      </div>
    </StyledSignup>
  );
};

export default Signup;