import React from "react";
import "./texts.css";

/**
 * Page title component for the page.
 * @param {string} text: text to display as a title
 * @returns Page title component
 */
function PageTitle({ text }) {
  return <h2 className="page-title no-select">{text}</h2>;
}

export default PageTitle;
