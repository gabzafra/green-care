import React from "react";
import styled from "styled-components";
import CloseBtn from "./StyledCloseBtn";
import ProfileBtn from "./ProfileBtn";

const HeaderWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: ${props => props.controls ? "space-between" : "center"};
  padding-left: 1rem;
  box-sizing: border-box;
`;

const LogoImg = styled.img`
  width: 75vw;
  height: 10vh;
`;

const ControlsWrapper = styled.div`
 display:${props => props.controls ? "flex" : "none"};
 flex-direction: column;
`;

const PageTitle = props => {
  const {controls,logoutHandler} = props;
  return (
    <HeaderWrapper controls={controls}>
      <LogoImg src="../images/green_care_w.svg" alt="green care logo" />
      <ControlsWrapper controls={controls}>
        <CloseBtn btnColor={"white"} logout={logoutHandler}/>
        <ProfileBtn btnColor={"white"} />
      </ControlsWrapper>
    </HeaderWrapper>
  );
};
export default PageTitle;
