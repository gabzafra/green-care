import React from "react";
import styled from "styled-components";
import colors from "../globalStyles/colors";

const GenericBtn = styled.button`
  border: none;
  background-color: ${colors.green};
  background-image: url(${props => props.img});
  background-position: center;
  background-repeat: no-repeat;
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
  margin-top: 1rem;
`;

const Button = props => {
  const { img, clicked } = props;
  return (
    <React.Fragment>    
        <GenericBtn img={img} onClick={e=>clicked(e)} />
    </React.Fragment>
  );
};

export default Button;
