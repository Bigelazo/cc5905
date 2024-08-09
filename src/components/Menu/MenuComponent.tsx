import { useEffect, useState } from "react";
import axios from "axios";
import Character from "../../model/Character";
import { Action, parseActionMenu } from "./util";
import ActionSelector from "./ActionSelectorv2";
import UnitList from "./UnitList";
import "./menu.css";

interface Props {
  currentUnit: string;
  actionSelected: string | null;
  setActionSelected: (actionId: string | null) => void;
  setTargetSelected: (id: string | null) => void;
  units: Character[];
  units2: Character[];
}

const MenuComponent = ({
  currentUnit,
  actionSelected,
  setActionSelected,
  setTargetSelected,
  units,
  units2,
}: Props) => {
  const [menu, setMenu] = useState<Action[]>([]);

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
          currentUnit={currentUnit}
          setActionSelected={setActionSelected}
          setTargetSelected={setTargetSelected}
          actionSelected={actionSelected}
          actionMenu={menu}
        />
      </div>
      <UnitList units={units2} />
    </div>
  );
};

export default MenuComponent;
