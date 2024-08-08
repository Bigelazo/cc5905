
import { LastActionType } from "../../hooks/useFetch";
import CharacterComponent from "../CharacterComponent";
import Character from "../../model/Character";
import Panel from "../../model/Panel";
import Player from "../../model/Player";
import "./grid.css";
import Animation from "./Animation";

interface Props {
  currentUnit: string;
  actionSelected: string | null;
  player: Player;
  size: [number, number];
  //handleClick: (id: string) => void;
  setTargetSelected: (id: string | null) => void;
  lastAction: LastActionType;
}


const GridComponent = ({
  currentUnit,
  actionSelected,
  player,
  size,
  //handleClick,
  setTargetSelected,
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
            id={"panel_"+p.id}
            key={p.id}
            className={"grid__panel"}
            onClick={
              actionSelected?.includes("2")
                ? () => {
                    setTargetSelected(p.id);
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
              return (
                <Animation
                  key={char.id}
                  panel={p}
                  char={char}
                  lastAction={lastAction}
                >
                  <CharacterComponent
                    actionSelected={actionSelected}
                    c={char}
                    handleClick={setTargetSelected}
                  />
                </Animation>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridComponent;
