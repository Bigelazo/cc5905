export type Action = {
  name: string;
  actionId?: string;
  targetId?: string;
  more?: Action[];  
};

export const parseActionMenu = (jsonData: { id: string; action: string; targets?: { id: string, name: string }[] }[]) => {
  let menu: Action[] = [];

  const addAction = (menu: Action[], actionPath: string[], actionId?: string, targetId?: string) => {
    const [current, ...rest] = actionPath;

    let currentAction = menu.find(item => item.name === current);
    if (!currentAction) {
      currentAction = { name: current };
      menu.push(currentAction);
    }

    if (rest.length > 0) {
      if (!currentAction.more) currentAction.more = [];
      addAction(currentAction.more, rest, actionId, targetId);
    } else {
      if(actionId) currentAction.actionId = actionId;
      if(targetId) currentAction.targetId = targetId;
    }
  };

  jsonData.forEach(({ id, action, targets }) => {
    const actionPath = action.split("→");

    if (targets) {
      targets.forEach(({ id: targetId, name: targetName }) => {
        addAction(menu, [...actionPath, targetName], id, targetId);
      });
    } else {
      addAction(menu, actionPath, id);
    }
  });

  return menu;
};
