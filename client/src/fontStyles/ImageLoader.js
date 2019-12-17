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
  width: 178px;
  height: 178px;
  border-radius: 50%;
  border: 8px solid ${colors.white};
  box-sizing: border-box;
`;

const Loader = props => {
  const { picture, handleUpload } = props;
  return (
    <React.Fragment>
      <CustomLabel htmlFor="file-upload" className="custom-file-upload">
        <PlantPortrait src={picture} />
      </CustomLabel>
      <InputField id="file-upload" type="file" onChange={handleUpload} />
    </React.Fragment>
  );
};

export default Loader;
