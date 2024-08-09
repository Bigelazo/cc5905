import { LastActionType } from "../../hooks/useFetch";
import CharacterComponent from "../CharacterComponent";
import Character from "../../model/Character";
import Panel from "../../model/Panel";
import "./grid.css";
import Animation from "./Animation";

interface Props {
  currentUnit: string;
  actionSelected: string | undefined;
  characters: Character[];
  panels: Panel[];
  size: [number, number];
  setTargetSelected: (id: string | undefined) => void;
  lastAction: LastActionType;
}

const GridComponent = ({
  currentUnit,
  actionSelected,
  characters,
  panels,
  size,
  setTargetSelected,
  lastAction,
}: Props) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${size[0]}, minmax(0, 1fr))`,
        position: "relative",
      }}
    >
      {panels.map((p: Panel) => {
        const charactersInPanel = characters.filter((c: Character) =>
          p.storage.includes(c.id)
        );
        return (
          <div
            id={"panel_" + p.id}
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
