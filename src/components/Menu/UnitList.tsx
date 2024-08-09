import Character from "../../model/Character";

const UnitList = ({ units }: { units: Character[] }) => {
  return (
    <div className="queue-info">
      {units.map((c: Character) => {
        return (
          <div key={c.id} className="info">
            {c.attributes.map(a => {
              return (
                <div key={a.name} className="info-others">
                  <label className="info-label">{a.name.toUpperCase()}:</label> {a.value}
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
