import Panel from "../model/Panel";
import PanelComponent from "./PanelComponent";
import "../styles/grid.css";
import { useFetchGridData } from "./useFetch";
import MapComponent from "./MapComponent";
import { LastActionType } from "./useFetch"

interface Props {
  currentUnit: string;
  actionSelected: number;
  playerId: string;
  size: [number, number];
  handleClick: (id: string) => void;
  lastAction: LastActionType;
}

const Grid = ({
  currentUnit,
  actionSelected,
  playerId,
  size,
  handleClick,
  lastAction
}: Props) => {
  const { units, panels } = useFetchGridData(playerId, currentUnit);
  console.log(currentUnit)
  //const units = p.storage
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
            units={p.storage}
            handleClick={handleClick}
            lastAction={lastAction}
          />
        );
      })}
    </div>
  );
};

export default Grid;
