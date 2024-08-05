import { useEffect, useState } from "react";
import axios from "axios";
import Character from "../../model/Character";
import { ActionMenu, parseActionMenu } from "./util";
import ActionSelector from "./ActionSelector";
import UnitList from "./UnitList";
import "./menu.css";

interface Props {
  currentUnit: string;
  actionSelected: string;
  setActionSelected: (actionId: string) => void;
  receiveAction: (id: string) => void;
  units: Character[];
  units2: Character[];
}

const MenuComponent = ({
  currentUnit,
  actionSelected,
  setActionSelected,
  receiveAction,
  units,
  units2,
}: Props) => {
  const [menu, setMenu] = useState<ActionMenu>([]);

  const showCurrentUnitActions = () => {
    axios.get(`${HOST}/show-actions/${currentUnit}`).then((response) => {
      setMenu(parseActionMenu(response.data.actions));
    });
  };

  useEffect(() => {
    showCurrentUnitActions();
  }, [currentUnit]);

  return (
    <div className="menu-container">
      <UnitList units={units} />
      <div className="action-selection">
        <ActionSelector
          isVisible={actionSelected.includes("MainMenu")}
          currentUnit={currentUnit}
          setActionSelected={setActionSelected}
          handleClick={receiveAction}
          actionSelected={actionSelected}
          actionMenu={menu}
        />
      </div>
      <UnitList units={units2} />
    </div>
  );
};

export default MenuComponent;
