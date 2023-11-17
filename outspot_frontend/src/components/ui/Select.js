import React from "react";

const Select = (props) => {
  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        value={props.value}
        onChange={props.onChanged}
        name="spotTypes"
        id={props.id}
      >
        <option value="picnic">Picnic</option>
        <option value="camping">Camping</option>
      </select>
    </div>
  );
};

export default Select;
