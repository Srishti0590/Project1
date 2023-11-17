import ErrorIcon from "../icons/ErrorIcon";
import SuccessIcon from "../icons/SuccessIcon";
const Message = ({ containerName, state, className, message, onClick }) => {
  return (
    <>
      <div className={`overlay ${className}`}>
        <div className={`message-container ${containerName}`}>
          {state === "error" ? (
            <ErrorIcon className="message-icon" />
          ) : (
            <SuccessIcon className="message-icon" />
          )}
          <p className="message">{message}</p>
          <span onClick={onClick} className="cross">
            &#9587;
          </span>
        </div>
      </div>
    </>
  );
};
export default Message;
