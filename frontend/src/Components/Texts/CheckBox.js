import React, { useState } from "react";

/**
 * CheckBox component.
 * @param {*} text
 * @param {boolean} onCheck: Function to update checkbox status
 * @returns CheckBox component
 */
function CheckBox({ text, onCheck }) {
  const [Checked, setChecked] = useState(false);

  const onClick = () => {
    if (!onCheck) return;
    const checked = !Checked;
    setChecked(checked);
    onCheck(checked);
  };

  return (
    <div className="checkbox row no-select">
      <input type="checkbox" className="col-1" onClick={onClick} />
      <div className="col-auto">{text}</div>
    </div>
  );
}

export default CheckBox;
