import React from "react";
import styled from "styled-components";
import "./StyledPlantCard.css";
import colors from "../../globalStyles/colors";
import { Link } from "react-router-dom";
import capitalize from "../../globalStyles/utils"

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 1rem;
`;

const PlantPortrait = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 8px solid ${colors.white};
  box-sizing: border-box;
`;

const PlantInfo = styled.div`
  color: ${colors.white};

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    font-family: "Roboto";
    font-style: italic;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  button {
    border: none;
    background-color: ${colors.green};
    background-position: center-top;
    background-repeat: no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    margin-top: 2rem;
  }
  .btn-edit {
    background-image: url(./images/edit_w.svg);
  }
  .btn-delete {
    background-image: url(./images/trash_w.svg);
    margin-left: 2rem;
  }
`;

const PlantCard = props => {
  const { id, picture, name, common_name, deletePlant } = props.plant;
  return (
    <CardContainer>
      <Link
        to={{
          pathname: `/plant-detail/${id}`,
          state: {
            flavour: "readonly"
          }
        }}
      >
        <PlantPortrait id={id} src={picture}></PlantPortrait>
      </Link>
      <div className="side-wrapper">
        <Link
          to={{
            pathname: `/plant-detail/${id}`,
            state: {
              flavour: "readonly"
            }
          }}
        >
          <PlantInfo id={id}>
            <h2>{capitalize(name)}</h2>
            <p>{capitalize(common_name)}</p>
          </PlantInfo>
        </Link>
        <ControlButtons>
          <Link
            to={{
              pathname: `/plant-update/${id}`,
              state: {
                flavour: "update"
              }
            }}
          >
            <button className="btn-edit"></button>
          </Link>
          <button
            className="btn-delete"
            id={id}
            onClick={e => deletePlant(e)}
          ></button>
        </ControlButtons>
      </div>
    </CardContainer>
  );
};

export default PlantCard;
