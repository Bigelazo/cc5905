import Character from "../model/Character";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  actionSelected: string;
  c: Character;
  handleClick: (id: string) => void;
}

const CharacterComponent = ({ actionSelected, c, handleClick }: Props) => {
  return (
    <Tooltip
      title={
        <div>
          {Object.entries(c.attributes).map(([key, value]) => {
            return (
              <div className="info-others" key={key}>
                <label className="info-label">{key}:</label> {value}
              </div>
            );
          })}
        </div>
      } /*componentsProps={{ tooltip: { sx: { background: "red" } }, arrow: { sx: { color: "red" } }, }}*/
    >
      <img
        onClick={
          actionSelected != "2" && actionSelected != "-1"
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
