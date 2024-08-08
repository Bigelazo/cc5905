export type Action = {
  name: string;
  actionId: string;
  targetId?: string;
  more?: ActionMenu;  
};

export type ActionMenu = ({
      name: string;
      actionId: string;
      //more?: ActionMenu;
      //isTarget: boolean;
      actions?: ActionMenu; //actions: Option[ActionMenu]
      targets?: ActionMenu;
})[];

export const parseActionMenu = (
  jsonData: {
    id: string;
    action: string;
    targets?: { actionId: string; name: string }[];
  }[]
) => {
  let selector: ActionMenu = [];

  const addActionToMenu = (
    menu: ActionMenu,
    breadCrumb: string[],
    id: string,
    targets?: { name: string; actionId: string }[]
  ) => {
    if (breadCrumb.length === 0) return;

    const [category, ...rest] = breadCrumb;
    let actionCategory = menu.find((item) => item.name === category);

    if (!actionCategory) {
      if (rest.length === 0) {
        actionCategory = targets
          ? { name: category, actionId: "Menu↓" + id, targets }
          : { name: category, actionId: id };
      } else {
        actionCategory = {
          name: category,
          actionId: category + "Menu",
          actions: [],
        };
      }
      menu.push(actionCategory);
    }

    if (rest.length > 0 && actionCategory.actions) {
      addActionToMenu(actionCategory.actions, rest, id, targets);
    }
  };

  jsonData.map(({ action, id, targets }) => {
    const breadCrumb = action.split("→");
    addActionToMenu(selector, breadCrumb, id, targets);
  });

  console.log(selector);
  return selector;
};
