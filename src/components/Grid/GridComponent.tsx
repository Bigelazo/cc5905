import { motion } from "framer-motion";
import { LastActionType } from "../../hooks/useFetch";
import CharacterComponent from "../CharacterComponent";
import Character from "../../model/Character";
import Panel from "../../model/Panel";
import Player from "../../model/Player";
import "./grid.css";

interface Props {
  currentUnit: string;
  actionSelected: string;
  player: Player;
  size: [number, number];
  handleClick: (id: string) => void;
  lastAction: LastActionType;
}

const GridComponent = ({
  currentUnit,
  actionSelected,
  player,
  size,
  handleClick,
  lastAction,
}: Props) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size[1]}, 1fr)`,
        gridTemplateRows: `repeat(${size[0]}, 1fr)`,
        position: "relative",
      }}
    >
      {player.panels.map((p: Panel) => {
        return (
          <div
            key={p.id}
            className={"grid__panel"}
            onClick={
              actionSelected == "2"
                ? () => {
                    handleClick(p.id);
                  }
                : () => {}
            }
            style={
              p.storage.length != 0
                ? p.storage.map((c) => c.id).includes(currentUnit)
                  ? {
                      gridColumnStart: p.x,
                      gridRowStart: p.y,
                      backgroundColor: "yellow",
                    }
                  : { gridColumnStart: p.x, gridRowStart: p.y }
                : { gridColumnStart: p.x, gridRowStart: p.y }
            }
          >
            {p.storage.map((char: Character) => {
              const ops =
                false && lastAction.sourceId && lastAction.sourceId == char.id
                  ? { animate: { x: 10, y: 20 } }
                  : {};
              return (
                <motion.div
                  key={char.id}
                  {...ops}
                  animate={{ x: 10, y: 20 }}
                  transition={{ type: "spring" }}
                >
                  <CharacterComponent
                    actionSelected={actionSelected}
                    c={char}
                    handleClick={handleClick}
                  />
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridComponent;
