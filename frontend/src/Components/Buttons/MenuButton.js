import React, { useEffect, useState } from "react";
import "./Buttons.css";

/**
 * Button component that have significant color on its border or background.
 * @param {string} textColor: color of the text
 * @param {string} text: text to display on a button
 * @param {Function} buttonFunction: function to be called when the button is clicked
 * @returns Button component
 */
function MenuButton({ text, textColor, buttonFunction }) {
  const [TextColor, setTextColor] = useState("#000");
  const [Text, setText] = useState("");

  useEffect(() => {
    if (!textColor || !text) return;
    // Update button styles from parent(s), if exists
    if (textColor) setTextColor(textColor);
    // Display texts on the button
    if (text) setText(text);
  }, [textColor, text]);

  // Action when the button is clicked
  const onButton = (e) => {
    e.preventDefault();
    // Use the function from parent(s), if exists
    if (buttonFunction) buttonFunction();
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
