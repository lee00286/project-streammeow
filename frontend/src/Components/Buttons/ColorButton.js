import React, { useEffect, useState } from "react";
import "./Buttons.css";

/**
 * Button component that have significant color on its border or background.
 * @param {string} props.buttonColor: background color of the button
 * @param {string} props.border: border style of the button
 * @param {string} props.textColor: color of the text
 * @param {string} props.text: text to display on a button
 * @param {Function} buttonFunction: function to be called when the button is clicked
 * @returns Button component
 */
function ColorButton(props) {
  const [ButtonColor, setButtonColor] = useState("#fff");
  const [Border, setBorder] = useState("none");
  const [TextColor, setTextColor] = useState("#000");
  const [Text, setText] = useState("");

  useEffect(() => {
    if (!props) return;
    // Update button styles from parent(s), if exists
    if (props.buttonColor) setButtonColor(props.buttonColor);
    if (props.border) setBorder(props.border);
    if (props.textColor) setTextColor(props.textColor);
    // Display texts on the button
    if (props.text) setText(props.text);
  }, [props]);

  // Action when the button is clicked
  const onButton = (e) => {
    e.preventDefault();
    // Use the function from parent(s), if exists
    if (props.buttonFunction) props.buttonFunction(e);
  };

  return (
    <button
      className="button rounded-1 color-button no-select"
      style={{ border: Border, backgroundColor: ButtonColor, color: TextColor }}
      onClick={onButton}
    >
      {Text}
    </button>
  );
}

export default ColorButton;
