import React from "react";
import "./texts.css";

/**
 * Page subtitle component for the page.
 * @param {string} text: text to display as a subtitle
 * @returns Page subtitle component
 */
function SubTitle({ text }) {
  return <h3 className="sub-title no-select">{text}</h3>;
}

export default SubTitle;
