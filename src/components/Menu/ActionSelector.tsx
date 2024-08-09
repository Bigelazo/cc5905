import { useEffect, useState } from "react";
import { Action } from "./util";
import ButtonComponent from "../ButtonComponent";

interface Props {
  currentUnit: string;
  actionSelected: string | undefined;
  setActionSelected: (actionId: string | undefined) => void;
  setTargetSelected: (targetId: string | undefined) => void;
  actionMenu: Action[];
}

function drawMenu(menu: Action[], breadCrumb: number[]) {
  if (breadCrumb.length === 0) {
    return menu;
  } else {
    let currentMenu = menu;
    for (let i = 0; i < breadCrumb.length; i++) {
      const more = currentMenu[breadCrumb[i]].more;
      if (more !== undefined) {
        currentMenu = more;
      } else {
        currentMenu = [];
      }
    }
    return currentMenu;
  }
}

const ActionSelector = ({
  actionSelected,
  setActionSelected,
  setTargetSelected,
  actionMenu,
}: Props) => {
  const [breadCrumb, setBreadCrumb] = useState<number[]>([]);
  const currentMenu = drawMenu(actionMenu, breadCrumb);

  const onClickAction = (action: Action) => {
    if (action.targetId) {
      setTargetSelected(action.targetId);
    }
    setActionSelected(action.actionId);
  };

  const onClickMore = (index: number) => setBreadCrumb([...breadCrumb, index]);

  const onClickBack = () => {
    setTargetSelected(undefined);
    setBreadCrumb(breadCrumb.slice(0, -1));
  };

  useEffect(() => {
    if (actionSelected === undefined) {
      setBreadCrumb([]);
    }
  }, [actionSelected]);

  return (
    <>
      {currentMenu.map((action, index) => {
        const onClick = action.more
          ? () => onClickMore(index)
          : () => onClickAction(action);
        return (
          <ButtonComponent
            key={index}
            selected={actionSelected === action.actionId}
            onClick={onClick}
          >
            {action.name}
          </ButtonComponent>
        );
      })}
      {breadCrumb.length > 0 && (
        <ButtonComponent selected={false} onClick={onClickBack}>
          Back
        </ButtonComponent>
      )}
    </>
  );
};
export default ActionSelector;
