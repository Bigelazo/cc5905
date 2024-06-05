

interface Props {
    selected: boolean,
    children: React.ReactNode,
    onClick: () => void,
  }

const BigelButton = (props: Props) => {
  return (
    <div className={"bigel-button"+(props.selected?" selected":"")} {...props} style={{width:"100%"}}>
      {props.children}
    </div>
  );
};

export default BigelButton