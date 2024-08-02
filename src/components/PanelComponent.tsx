import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";

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
      className={"grid__panel"}
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
    </div>
  );
};

export default PanelComponent;
