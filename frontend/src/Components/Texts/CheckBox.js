import React from "react";

/**
 * CheckBox component.
 * @param {*} text, onCheck 
 * @returns CheckBox component
 */
function CheckBox({ text, onCheck }) {
  const onClick = () => {
    if (!onCheck) return;
    onCheck();
  };

  return (
    <div className="checkbox row">
      <input type="checkbox" className="col-1" onClick={onClick} />
      <div className="col-auto">{text}</div>
    </div>
  );
}

export default CheckBox;
