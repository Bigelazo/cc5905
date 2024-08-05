import { motion } from "framer-motion";
import Character from "../../model/Character";
import { LastActionType } from "../../hooks/useFetch";
import Panel from "../../model/Panel";
import Player from "../../model/Player";

interface Props {
    children: React.ReactNode;
    char: Character;
    panel: Panel;
    lastAction: LastActionType;
}

function findPanelByCharId(charId: string, state: Player[]): Panel | null {
    for (const player of state) {
        for (const panel of player.panels) {
            for (const unit of panel.storage) {
                if (unit.id === charId) {
                    return panel;
                }
            }
        }
    }
    return null;
}
const Animation = ({children, char, panel, lastAction}: Props) => {
    if(lastAction.sourceId == char.id){
        console.log("Animation", lastAction);
        console.log("panel", );
        const sourcePanel = findPanelByCharId(char.id, lastAction.state);
        const from = document.getElementById("panel_"+sourcePanel?.id)?.getBoundingClientRect();
        const to = document.getElementById("panel_"+lastAction.targetId)?.getBoundingClientRect();
        if(from && to){
            console.log(from, to)
            return (
            <motion.div
                initial={{ x: from.x - to.x, y: from.y - to.y }}
                animate={{ x: 0 , y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
            );
        } else{
            console.log("sourcePanel not found");
            return <motion.div>{children}</motion.div>;
        }
    } else{
        return <motion.div>{children}</motion.div>;
    }
  }

export default Animation;