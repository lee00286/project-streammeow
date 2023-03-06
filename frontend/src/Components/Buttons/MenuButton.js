import React, { useEffect, useState } from "react";
import "./Buttons.css";

/**
 * Button component that have significant color on its border or background.
 * @param {*} props // { textColor, text }
 * @returns Button component
 */
function MenuButton(props) {
  const [TextColor, setTextColor] = useState("#000");
  const [Text, setText] = useState("");

  useEffect(() => {
    if (!props) return;
    // Update button styles from parent(s), if exists
    if (props.textColor) setTextColor(props.textColor);
    // Display texts on the button
    if (props.text) setText(props.text);
  }, [props]);

  // Action when the button is clicked
  const onButton = (e) => {
    e.preventDefault();
    // Use the function from parent(s), if exists
    if (props.buttonFunction) props.buttonFunction();
  };

  return (
    <button
      className="button menu-button no-select"
      style={{ color: TextColor }}
      onClick={onButton}
    >
      {Text}
    </button>
  );
}

export default MenuButton;
