import React from "react";
import styled from "styled-components";
import colors from "../globalStyles/colors";
import StyledButton from "../fontStyles/StyledButton";
import { Link } from "react-router-dom";

const GenericBtn = styled.button`
  font-family: "Encode Sans";
  color: ${colors.white};
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  height: 40px;
  min-width: 140px;
  max-width: 350px;
  padding: 5px 10px 10px;
  margin: 0.5rem;
  box-sizing: border-box;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
  .btn-green {
    background: ${colors.green};
    border: 1px solid ${colors.white};
  }
  .btn-red {
    background: ${colors.red};
  }
  .btn-new {
    background: ${colors.white};
    color: ${colors.green};
    font-size: 2.5rem;
    font-weight: 600;
    padding: 0;
    line-height: 1rem;
    align-self: flex-end;
  }
`;

const Buttons = props => {
  const { updateHandler, flavour } = props;
  return (
    <BtnWrapper>
      {(() => {
        switch (flavour) {
          case "readonly":
            return <GenericBtn className="btn-red">Go back</GenericBtn>;
          case "update":
            return (
              <React.Fragment>
                <GenericBtn className="btn-red">Cancel</GenericBtn>
                <GenericBtn className="btn-green" onClick={e=>updateHandler(e)}>Update</GenericBtn>
              </React.Fragment>
            );
          case "create":
            return (
              <React.Fragment>
                <GenericBtn className="btn-green" onClick={e=>updateHandler(e)}>Create</GenericBtn>
              </React.Fragment>
            );
          case "main":
            return (
              <React.Fragment>
                <StyledButton img={"../images/calendar_w.svg"} />
                <Link
                  to={{
                    pathname: `/plant/new`,
                    state: {
                      flavour: "create"
                    }
                  }}
                >
                  <GenericBtn className="btn-new">+</GenericBtn>
                </Link>

                <StyledButton img={"../images/map_w.svg"} />
              </React.Fragment>
            );
          default:
            return (
              <React.Fragment>
                <GenericBtn className="btn-red">Cancel</GenericBtn>
                <GenericBtn className="btn-green">Accept</GenericBtn>
              </React.Fragment>
            );
        }
      })()}
    </BtnWrapper>
  );
};

export default Buttons;
