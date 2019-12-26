import styled from "styled-components";

const LoadingOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color : rgba(0,0,0,.2);
  background-image : url(../images/Spinner-1s-200px.svg);
  background-position: center;
  background-repeat: no-repeat;
  z-index : 1000;
  }
`;

export default LoadingOverlay;
