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

  const receiveDamage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    axios
      .post("http://localhost:8080/attack/" + currentUnit + "/" + c.id)
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        setMessage(currentUnit + " attacked " + c.name);
        setActionSelected(-1);
      });
  };

  return (
    <>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={actionSelected === 1 ? (e) => receiveDamage(e) : () => {}}
        style={
          currentUnit == c.id
            ? { color: "yellow", border: "1px solid" }
            : { border: "1px solid" }
        }
      >
        {c.name}
      </div>
      {show && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#555",
            padding: "8px",
            borderRadius: "5px",
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
