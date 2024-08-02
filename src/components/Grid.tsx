import Panel from "../model/Panel";
import PanelComponent from "./PanelComponent";
import "../styles/grid.css";
import { useFetchGridData } from "./useFetch";

interface Props {
  currentUnit: string;
  actionSelected: number;
  playerId: string;
  size: [number, number];
  handleClick: (id: string) => void;
}

const Grid = ({
  currentUnit,
  actionSelected,
  playerId,
  size,
  handleClick,
}: Props) => {
  const { units, panels } = useFetchGridData(playerId, currentUnit);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size[1]}, 1fr)`,
        gridTemplateRows: `repeat(${size[0]}, 1fr)`,
        position: "relative",
      }}
    >
      {panels.map((p: Panel) => {
        return (
          <PanelComponent
            key={p.id}
            currentUnit={currentUnit}
            actionSelected={actionSelected}
            p={p}
            units={units.filter((u) => u.mappableId == p.id)}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default Grid;
