import { useEffect, useState } from "react";
import { Action } from "./util";
import ButtonComponent from "../ButtonComponent";

interface ActionSelectorProps {
  currentUnit: string;
  actionSelected: string | undefined;
  setActionSelected: (actionId: string | undefined) => void;
  setTargetSelected: (id: string | undefined) => void;
  actionMenu: Action[];
}

function drawMenu(menu: any[], breadCrumb: number[]) {
  if (breadCrumb.length === 0) {
    return menu;
  } else {
    let currentMenu = menu;
    for (let i = 0; i < breadCrumb.length; i++) {
      currentMenu = currentMenu[breadCrumb[i]].more;
    }
    return currentMenu;
  }
}

const ActionSelectorv2 = ({
  currentUnit,
  actionSelected,
  setActionSelected,
  setTargetSelected,
  actionMenu,
}: ActionSelectorProps) => {
  const [breadCrumb, setBreadCrumb] = useState<number[]>([]);
  const currentMenu = drawMenu(actionMenu, breadCrumb);

  const onClickAction = (action: Action) => () => {
    if (action.targetId) {
      setTargetSelected(action.actionId);
      console.log("Target selected");
    } else {
      setActionSelected(action.actionId);
      console.log("Action selected");
    }
  };

  useEffect(() => {
    if (actionSelected === null) {
      setBreadCrumb([]);
    }
  }, [actionSelected]);

  return (
    <>
      {currentMenu.map((action, index) => {
        const onClick = action.more
          ? () => setBreadCrumb([...breadCrumb, index])
          : onClickAction(action);
        return (
          <ButtonComponent
            key={"bc" + index}
            selected={actionSelected === action.actionId}
            onClick={onClick}
          >
            {action.name}
          </ButtonComponent>
        );
      })}
      {breadCrumb.length > 0 && (
        <ButtonComponent
          selected={false}
          onClick={() => setBreadCrumb(breadCrumb.slice(0, -1))}
        >
          Back
        </ButtonComponent>
      )}
    </>
  );
};
export default ActionSelectorv2;
