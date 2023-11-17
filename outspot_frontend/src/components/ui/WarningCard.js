import Card from "./Card";

const WarningCard = ({ onClick, onClose }) => {
  return (
    <div className="warning-overlay">
      <Card classname="warning-card">
        <p className="warning-question">
          Are you sure you want to perform the action?
        </p>

        <div className="warning-controls">
          <button className="btn--yes" onClick={onClick}>
            Yes
          </button>
          <button className="btn--no" onClick={onClose}>
            No
          </button>
        </div>
      </Card>
    </div>
  );
};
export default WarningCard;
