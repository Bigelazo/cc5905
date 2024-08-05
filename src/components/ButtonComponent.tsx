interface Props {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonComponent = ({ selected, children, onClick }: Props) => {
  return (
    <div
      className={"bigel-button" + (selected ? " selected" : "")}
      onClick={onClick}
      style={{ width: "100%" }}
    >
      {children}
    </div>
  );
};

export default ButtonComponent;
