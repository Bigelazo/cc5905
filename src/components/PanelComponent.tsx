import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";
import {motion} from "framer-motion";
import { LastActionType } from "./useFetch";
interface Props {
  currentUnit: string;
  actionSelected: number;
  p: Panel;
  units: Character[];
  handleClick: (id: string) => void;
  lastAction: LastActionType
}

const PanelComponent = ({
  currentUnit,
  actionSelected,
  p,
  units,
  handleClick,
  lastAction
}: Props) => {
  const ids = units.map((u) => u.id);
  console.log('lastAction', lastAction)
  return (
    <div
      className={"grid__panel"}
      onClick={
        actionSelected == 2
          ? () => {
              handleClick(p.id);
            }
          : () => {}
      }
      style={
        ids.includes(currentUnit)
          ? {
              gridColumnStart: p.x,
              gridRowStart: p.y,
              backgroundColor: "yellow",
            }
          : { gridColumnStart: p.x, gridRowStart: p.y }
      }
    >
      {units.map((c: Character) => {
        const ops = false && lastAction.sourceId && lastAction.sourceId == c.id?{animate: {x: 10, y: 20}}:{}
        return (
          <motion.div
          {...ops}
          /*animate={{x: 10, y: 20}}
          transition={{type: "spring"}}*/
          >
            <CharacterComponent
              key={c.id}
              actionSelected={actionSelected}
              c={c}
              handleClick={handleClick}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PanelComponent;
