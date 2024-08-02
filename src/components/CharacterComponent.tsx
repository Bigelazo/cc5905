import Character from "../model/Character";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  actionSelected: number;
  c: Character;
  handleClick: (id: string) => void;
}

const CharacterComponent = ({ actionSelected, c, handleClick }: Props) => {
  return (
    <Tooltip
      title={
        <div>
          <div>
            <label className="info-label">NAME</label>: {c.name}
          </div>
          <div>
            <label className="info-label">HP</label>: {c.hp}
          </div>
          <div>
            <label className="info-label">ATK</label>: {c.atk}
          </div>
        </div>
      } /*componentsProps={{ tooltip: { sx: { background: "red" } }, arrow: { sx: { color: "red" } }, }}*/
    >
      <img
        onClick={
          actionSelected != 2 && actionSelected != -1
            ? () => {
                handleClick(c.id);
              }
            : () => {}
        }
        src={`${HOST}/static/resource/${c.img}`}
      ></img>
    </Tooltip>
  );
};

export default CharacterComponent;
