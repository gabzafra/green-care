import React from "react";
import styled from "styled-components";
import colors from "../globalStyles/colors";

const InputField = styled.input`
  display: none;
`;

const CustomLabel = styled.label`
  cursor: pointer;
`;

const PlantPortrait = styled.img`
  width: ${props => props.size ? props.size : "178"}px;
  height: ${props => props.size ? props.size : "178"}px;
  border-radius: 50%;
  border: 8px solid ${colors.white};
  box-sizing: border-box;
`;

const Loader = props => {
  const { picture, handleUpload, flavour, size } = props;
  console.log(size);
  return (
    <React.Fragment>
      {flavour !== "readonly" ? (
        <React.Fragment>
          <CustomLabel htmlFor="file-upload" className="custom-file-upload">
            <PlantPortrait src={picture} />
          </CustomLabel>
          <InputField id="file-upload" type="file" onChange={handleUpload} />
        </React.Fragment>
      ) : (
        <PlantPortrait className="round-img" src={picture} size={size}/>
      )}
    </React.Fragment>
  );
};

export default Loader;
