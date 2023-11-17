const Card = ({ classname, children }) => {
  return <div className={`${classname} card`}>{children}</div>;
};
export default Card;
