import React from "react";
import styled from "styled-components";
import CloseBtn from "./StyledCloseBtn";

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  box-sizing: border-box;
`;

const LogoImg = styled.img`
  width: 70vw;
  height: 10vh;
`;

const PageTitle = props => {
  return (
    <HeaderWrapper>
      <LogoImg src={props.src} alt={props.alt} />
      <CloseBtn btnColor={"white"} />
    </HeaderWrapper>
  );
};
export default PageTitle;
