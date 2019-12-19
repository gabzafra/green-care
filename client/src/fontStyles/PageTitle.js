import React from "react";
import styled from "styled-components";
import CloseBtn from "./StyledCloseBtn";
import ProfileBtn from "./ProfileBtn";

const HeaderWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  box-sizing: border-box;
`;

const LogoImg = styled.img`
  width: 75vw;
  height: 10vh;
`;

const ControlsWrapper = styled.div`
 display:flex;
 flex-direction: column;
`;

const PageTitle = props => {
  return (
    <HeaderWrapper>
      <LogoImg src="../images/green_care_w.svg" alt="green care logo" />
      <ControlsWrapper>
        <CloseBtn btnColor={"white"} logout={props.logoutHandler}/>
        <ProfileBtn btnColor={"white"} />
      </ControlsWrapper>
    </HeaderWrapper>
  );
};
export default PageTitle;
