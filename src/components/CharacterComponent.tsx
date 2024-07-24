import React, { ReactNode, useContext, useState } from "react";
import { Button } from "@mui/material";
import Character from "../model/Character";
import { ActionSelectedContext, CurrentUnitContext } from "./context";
import axios from "axios";

interface Props {
  c: Character;
  setMessage: (s: string) => void;
}

const CharacterComponent = ({ c, setMessage }: Props) => {
  console.log("Rendering Character " + c.id);

  const [show, setShow] = useState(false);

  const { currentUnit, setCurrentUnit } = useContext(CurrentUnitContext);
  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  const receiveAction = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    axios
      .post(
        `http://localhost:8080/execute-action/${actionSelected}/${currentUnit}/${c.id}`
      )
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        setMessage(response.data.message);
        setActionSelected(-1);
      });
  };

  return (
    <>
      <img
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={
          actionSelected != 2 && actionSelected != -1
            ? (e) => receiveAction(e)
            : () => {}
        }
        src={`http://localhost:8080/static/resource/${c.img}`}
      ></img>
      {show && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#555",
            padding: "8px",
            borderRadius: "5px",
            top: "0",
          }}
        >
          <div>Name: {c.name}</div>
          <div>Health points: {c.hp}</div>
          <div>Attack damage: {c.atk}</div>
        </div>
      )}
    </>
  );
};

export default CharacterComponent;
