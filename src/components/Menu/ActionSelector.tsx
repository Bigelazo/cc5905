import ButtonComponent from "../ButtonComponent";
import { ActionMenu } from "./util";

interface ActionSelectorProps {
  isVisible: boolean;
  currentUnit: string;
  actionSelected: string;
  setActionSelected: (actionId: string) => void;
  handleClick: (id: string) => void;
  actionMenu: ActionMenu;
}

const ActionSelector = ({
  isVisible,
  currentUnit,
  actionSelected,
  setActionSelected,
  handleClick,
  actionMenu,
}: ActionSelectorProps) => {
  const cutAndSetLastActionSelected = (actionId: string) => {
    const breadCrumb = actionSelected.split("→");
    const lastAction = breadCrumb[breadCrumb.length - 1];
    const cleanedBreadCrumb = lastAction?.includes("Menu")
      ? breadCrumb
      : breadCrumb.slice(0, -1);
    const cleanedActionSelected = cleanedBreadCrumb.join("→");
    setActionSelected(cleanedActionSelected + "→" + actionId);
  };

  const handleClickActionSelection = (actionId: string) => {
    if (actionId.includes("Menu")) {
      setActionSelected(actionId);
    } else {
      cutAndSetLastActionSelected(actionId);
    }
  };

  return (
    <>
      {isVisible &&
        actionMenu.map((action) => (
          <ButtonComponent
            selected={actionSelected.includes(action.actionId)}
            onClick={() => handleClickActionSelection(action.actionId)}
          >
            {action.name}
          </ButtonComponent>
        ))}

      {actionMenu.map(
        (action) =>
          action.actions &&
          actionSelected.includes(action.actionId) && (
            <>
              <ActionSelector
                isVisible={actionSelected.includes(action.actionId)}
                currentUnit={currentUnit}
                actionSelected={actionSelected}
                setActionSelected={setActionSelected}
                handleClick={() => {}}
                actionMenu={action.actions}
              />
              <ButtonComponent
                selected={actionSelected === action.actionId}
                onClick={() => setActionSelected("MainMenu")}
              >
                Go Back
              </ButtonComponent>
            </>
          )
      )}

      {actionMenu.map(
        (action) =>
          action.targets &&
          actionSelected.includes(action.actionId) && (
            <>
              <ActionSelector
                isVisible={actionSelected.includes(action.actionId)}
                currentUnit={currentUnit}
                actionSelected={actionSelected}
                setActionSelected={setActionSelected}
                handleClick={handleClick}
                actionMenu={action.targets}
              />
              <ButtonComponent
                selected={actionSelected === action.actionId}
                onClick={() => setActionSelected("MainMenu")}
              >
                Go Back
              </ButtonComponent>
            </>
          )
      )}
    </>
  );
};

export default ActionSelector;
