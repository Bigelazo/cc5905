import Character from "../model/Character";
import Panel from "../model/Panel";
import CharacterComponent from "./CharacterComponent";

interface Props {
  currentUnit: string;
  actionSelected: number;
  panels: Panel[];
  units: Character[];
  handleClick: (id: string) => void;
}

const MapComponent = ({
  currentUnit,
  actionSelected,
  panels,
  units,
  handleClick,
}: Props) => {
  const ids = units.map((u) => u.id);

  return (
    <>
      {panels.map((p: Panel) => {
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
              <CharacterComponent
                key={c.id}
                actionSelected={actionSelected}
                c={c}
                handleClick={handleClick}
              />
            );
          })}
        </div>;
      })}
    </>
  );
};

export default MapComponent;
