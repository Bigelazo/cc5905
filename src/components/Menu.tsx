import React, { useContext, useEffect, useState } from "react";
import "../styles/menu.css";
import Button from "./Button";
import { ActionSelectedContext } from "./context";

const Menu = () => {
  console.log("Rendering Menu");

  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  return (
    <div className="menu-container">
      <div className="left-info">
        <div className="headers">
          <h5>Name</h5>
          <h5>Info 1</h5>
          <h5>Info 2</h5>
          <h5>Info 3</h5>
        </div>
        <div className="info">
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
        </div>
      </div>
      <div className="action-selection">
        <Button
          onClick={() => setActionSelected(1)}
          selected={actionSelected == 1}
        >
          Attack
        </Button>
        <Button
          onClick={() => setActionSelected(2)}
          selected={actionSelected == 2}
        >
          Move
        </Button>
        <Button
          onClick={() => setActionSelected(3)}
          selected={actionSelected == 3}
        >
          Fireball
        </Button>
      </div>
      <div className="right-info">
        <div className="headers">
          <h5>Name</h5>
          <h5>Info 1</h5>
          <h5>Info 2</h5>
          <h5>Info 3</h5>
        </div>
        <div className="info">
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
          <p>Bad guy 1</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
