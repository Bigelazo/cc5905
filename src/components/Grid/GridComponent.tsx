
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
  characters: Character[];
  panels: Panel[];
  size: [number, number];
  //handleClick: (id: string) => void;
  setTargetSelected: (id: string | null) => void;
  lastAction: LastActionType;
}


const GridComponent = ({
  currentUnit,
  actionSelected,
  characters,
  panels,
  size,
  //handleClick,
  setTargetSelected,
  lastAction,
}: Props) => {
  return (
    <div
      className="grid"
      style={{
        //gridTemplateColumns: `repeat(${size[1]}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size[0]}, minmax(0, 1fr))`,
        position: "relative",
      }}
    >
      {panels.map((p: Panel) => {
        console.log(p)
        const charactersInPanel = characters.filter((c: Character) => p.storage.includes(c.id));
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
              charactersInPanel.length != 0
                ? charactersInPanel.map((c) => c.id).includes(currentUnit)
                  ? {
                      gridColumnStart: p.x,
                      gridRowStart: p.y,
                      backgroundColor: "yellow",
                    }
                  : { gridColumnStart: p.x, gridRowStart: p.y }
                : { gridColumnStart: p.x, gridRowStart: p.y }
            }
          >
            {charactersInPanel.map((char: Character) => {
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
