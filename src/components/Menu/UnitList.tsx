import Character from "../../model/Character";

const UnitList = ({ units }: { units: Character[] }) => {
  return (
    <div className="queue-info">
      {units.map((c: Character) => {
        return (
          <div key={c.id} className="info">
            {Object.entries(c.attributes).map(([key, value]) => {
              return (
                <div key={key} className="info-others">
                  <label className="info-label">{key}:</label> {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default UnitList;
