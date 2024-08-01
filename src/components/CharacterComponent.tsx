import React, { ReactNode, useContext, useState } from "react";
import { Button } from "@mui/material";
import Character from "../model/Character";
import { ActionSelectedContext, CurrentUnitContext } from "./context";
import axios from "axios";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

interface Props {
  c: Character;
  setMessage: (s: string) => void;
  handleClick: (id: string) => void;
}

const CharacterComponent = ({ c, setMessage, handleClick }: Props) => {
  console.log("Rendering Character " + c.id);

  const [show, setShow] = useState(false);

  const { currentUnit, setCurrentUnit } = useContext(CurrentUnitContext);
  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  {
    show && (
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
    );
  }

  return (
    <>
      <Tooltip
        title={
          <div>
            <div>
              <label className="info-label">NAME</label>: {c.name}
            </div>
            <div>
              <label className="info-label">HP</label>: {c.hp}
            </div>
            <div>
              <label className="info-label">ATK</label>: {c.atk}
            </div>
          </div>
        } /*componentsProps={{ tooltip: { sx: { background: "red" } }, arrow: { sx: { color: "red" } }, }}*/
      >
        <img
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={
            actionSelected != 2 && actionSelected != -1
              ? () => {
                  handleClick(c.id);
                }
              : () => {}
          }
          src={`http://localhost:8080/static/resource/${c.img}`}
        ></img>
      </Tooltip>
    </>
  );
};

export default CharacterComponent;
