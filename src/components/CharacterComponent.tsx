import Character from "../model/Character";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  actionSelected: string | undefined;
  c: Character;
  handleClick: (id: string) => void;
}

const CharacterComponent = ({ actionSelected, c, handleClick }: Props) => {
  return (
    <Tooltip
      title={
        <div>
          {c.attributes.map((v) => {
            return (
              <div className="info-others" key={v.name}>
                <label className="info-label">{v.name.toUpperCase()}:</label>
                {v.value}
              </div>
            );
          })}
        </div>
      }
    >
      <img
        onClick={
          actionSelected != "2" &&
          actionSelected != "-1" &&
          actionSelected != "3"
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
