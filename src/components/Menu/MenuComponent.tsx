import { useEffect, useState } from "react";
import axios from "axios";
import ButtonComponent from "../ButtonComponent";
import Character from "../../model/Character";
import "./menu.css";

type ActionMenu = (
  | {
      name: string;
      actionId: string;
      actions?: undefined;
    }
  | {
      name: string;
      actionId: string;
      actions: ActionMenu;
    }
)[];

/*const selector: ActionMenu = [
  { name: "Move", actionId: "2" },
  { name: "Punch", actionId: "1" },
  {
    name: "Spell",
    actionId: "0",
    actions: [
      { name: "Fireball", actionId: "3" },
      { name: "Icebolt", actionId: "4" },
    ],
  },
];
*/

interface Props {
  currentUnit: string;
  actionSelected: string;
  setActionSelected: (actionId: string) => void;
  units: Character[];
  units2: Character[];
}

const MenuComponent = ({
  currentUnit,
  actionSelected,
  setActionSelected,
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
          isVisible={true}
          currentUnit={currentUnit}
          setActionSelected={setActionSelected}
          actionSelected={actionSelected}
          actionMenu={menu}
        />
      </div>
      <UnitList units={units2} />
    </div>
  );
};

export default MenuComponent;

const parseActionMenu = (jsonData: { action: string; id: string }[]) => {
  let selector: ActionMenu = [];

  let counter = -10;

  const addActionToMenu = (
    menu: ActionMenu,
    breadCrumb: string[],
    id: string
  ) => {
    if (breadCrumb.length === 0) return;

    const [category, ...rest] = breadCrumb;
    let actionCategory = menu.find((item) => item.name === category);

    if (!actionCategory) {
      actionCategory =
        rest.length === 0
          ? { name: category, actionId: id }
          : { name: category, actionId: (counter--).toString(), actions: [] };
      menu.push(actionCategory);
    }

    if (rest.length > 0 && actionCategory.actions) {
      addActionToMenu(actionCategory.actions, rest, id);
    }
  };

  jsonData.map(({ action, id }) => {
    const breadCrumb = action.split("→");
    addActionToMenu(selector, breadCrumb, id);
  });

  console.log(selector);
  return selector;
};

const UnitList = ({ units }: { units: Character[] }) => {
  return (
    <div className="queue-info">
      {units.map((c: Character) => {
        return (
          <div key={c.id} className="info">
            {Object.entries(c.attributes).map(([key, value]) => {
              return (
                <div key={key} className="info-others">
                  <label className="info-label">{key}:</label> {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

interface ActionSelectorProps {
  isVisible: boolean;
  currentUnit: string;
  actionSelected: string;
  setActionSelected: (actionId: string) => void;
  actionMenu: ActionMenu;
}

const ActionSelector = ({
  isVisible,
  currentUnit,
  actionSelected,
  setActionSelected,
  actionMenu,
}: ActionSelectorProps) => {
  return (
    <>
      {isVisible &&
        actionMenu.map((action) => {
          return (
            <>
              <ButtonComponent
                selected={actionSelected === action.actionId}
                onClick={() => setActionSelected(action.actionId)}
              >
                {action.name}
              </ButtonComponent>
              {action.actions && (
                <>
                  <ActionSelector
                    isVisible={actionSelected === action.actionId}
                    currentUnit={currentUnit}
                    actionSelected={actionSelected}
                    setActionSelected={setActionSelected}
                    actionMenu={action.actions}
                  />
                  <ButtonComponent
                    selected={actionSelected === action.actionId}
                    onClick={() => setActionSelected("-1")}
                  >
                    Go Back
                  </ButtonComponent>
                </>
              )}
            </>
          );
        })}
    </>
  );
};
