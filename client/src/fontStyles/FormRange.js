import React from "react";
import styled from "styled-components";

const Label = styled.label`
    font-size: 2rem
`;

const RangeInput = styled.input``;

const NumberBoard = styled.p``;

const Loader = props => {
  const { name, handleChange, value, id, labelText } = props;
  return (
    <React.Fragment>
        <Label forHtml={id} name={name}>{labelText}</Label>
        <div></div>
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
    </React.Fragment>
  );
};

export default Loader;
