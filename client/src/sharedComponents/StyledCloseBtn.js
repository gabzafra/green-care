import React from "react";
import styled from "styled-components";
import colors from "../globalStyles/colors";

const StyledButton = styled.button`
        border: none;
        background-color: ${colors.green};
        background-image: ${props => props.btnColor === "white" ? "url(../images/close_w.svg)" :"url(./images/close_g.svg)"};
        background-position: center;
        background-repeat: no-repeat;
        width: 5vw;
        height: 3vh;
        margin-right: 1rem;
        margin-top: 1rem;
`;

const CloseBtn = props => {
    const { btnColor,logout } = props;
    return (
            <StyledButton btnColor={btnColor} onClick={logout} />
    );
};

export default CloseBtn;