const Input = ({ id, label, value, isValid, type, placeholder, onChanged }) => {
  return (
    <>
      <div className="control">
        <label htmlFor={id}>{label}</label>
        <input
          value={value}
          className={isValid !== undefined && !isValid ? "invalid" : ""}
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={onChanged}
        />
      </div>
    </>
  );
};
export default Input;
