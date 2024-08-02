import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";
import {motion} from "framer-motion";
interface Props {
  currentUnit: string;
  actionSelected: number;
  p: Panel;
  units: Character[];
  handleClick: (id: string) => void;
}

const PanelComponent = ({
  currentUnit,
  actionSelected,
  p,
  units,
  handleClick,
}: Props) => {
  const ids = units.map((u) => u.id);

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
        return (
          <motion.div
          animate={{x: 10, y: 20}}
          transition={{type: "spring"}}
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
