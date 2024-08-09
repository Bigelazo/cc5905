import { motion } from "framer-motion";
import Character from "../../model/Character";
import { LastActionType } from "../../hooks/useFetch";
import Panel from "../../model/Panel";

interface Props {
  children: React.ReactNode;
  char: Character;
  panel: Panel;
  lastAction: LastActionType;
}

function findPanelByCharId(charId: string, panels: Panel[]): Panel | null {
  for (const panel of panels) {
    for (const unitId of panel.storage) {
      if (unitId === charId) {
        return panel;
      }
    }
  }
  return null;
}
const Animation = ({ children, char, lastAction }: Props) => {
  if (lastAction.sourceId == char.id) {
    const sourcePanel = findPanelByCharId(char.id, lastAction.panels);
    const from = document
      .getElementById("panel_" + sourcePanel?.id)
      ?.getBoundingClientRect();
    const to = document
      .getElementById("panel_" + lastAction.targetId)
      ?.getBoundingClientRect();
    if (from && to) {
      return (
        <motion.div
          initial={{ x: from.x - to.x, y: from.y - to.y }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      );
    } else {
      return <motion.div>{children}</motion.div>;
    }
  } else {
    return <motion.div>{children}</motion.div>;
  }
};

export default Animation;
