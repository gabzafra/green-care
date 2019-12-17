import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 1.8rem;
  align-self: flex-start;
  margin-left: 1rem;  
`;

const RangeInput = styled.input`
`;

const RangeWrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
`;

const NumberBoard = styled.p`
  font-size: 2rem;
`;

const Loader = props => {
  const { name, handleChange, value, id, labelText } = props;
  return (
    <React.Fragment>
      <Label forHtml={id} name={name}>
        {labelText}
      </Label>
      <RangeWrapper>
        <RangeInput
          id={id}
          type="range"
          name={name}
          step={1}
          value={value}
          min={1}
          max={15}
          onChange={handleChange}
        ></RangeInput>
        <NumberBoard>{value}</NumberBoard>
      </RangeWrapper>
    </React.Fragment>
  );
};

export default Loader;
