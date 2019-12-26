import React from "react";
import styled from "styled-components";
import colors from "../globalStyles/colors";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
        border: none;
        background-color: ${colors.green};
        background-image: ${props => props.btnColor === "white" ? "url(../images/user_w.svg)" :"url(./images/user_g.svg)"};
        background-position: center;
        background-repeat: no-repeat;
        width: 5vw;
        height: 3vh;
        margin-right: 1rem;
        margin-top: 1rem;
`;

const ProfileBtn = props => {
    const { btnColor } = props;
    return (
        <Link to={{pathname: `/profile`}}>
            <StyledButton btnColor={btnColor} />
        </Link>
    );
};

export default ProfileBtn;