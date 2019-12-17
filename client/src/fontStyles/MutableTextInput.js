import React from "react";
import styled from "styled-components";
import colors from "../globalStyles/colors";

const InputField = styled.input`
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
  }`;
  
const StaticField = styled.p`
  background-color: ${colors.green};
  font-family: "Encode Sans"; 
  font-size: 1.7rem;
  padding: 1rem;
`;

const Input = props => {
  const { name, value, handleChange, flavour, placeholder } = props;
  return (
    <React.Fragment>
      {flavour === "readonly" ? (
        <StaticField>{value}</StaticField>
      ) : (
        <InputField name={name} value={value} onChange={handleChange} placeholder={placeholder} />
      )}
    </React.Fragment>
  );
};

export default Input;
