import React, { useEffect, useState } from "react";
import "../styles/menu.css";
import { Button } from "@mui/material";

const Menu = () => {
  const [actionSelected, setActionSelected] = useState<number | null>(null);

  const onAction = (id: number) => () => {
    setActionSelected(id);
  }
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
        <p>
          <Button variant="contained" size="small" onClick={onAction(0)}
            sx={actionSelected == 0?{ backgroundColor: 'yellow', '&:hover': { backgroundColor: 'darkyellow' } }:{}}
          >
            Attack
          </Button>
        </p>
        <p>Option 2</p>
        <p>Option 3</p>
        <p>Option 4</p>
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
