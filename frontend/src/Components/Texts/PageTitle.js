import React from "react";
import "./texts.css";

/**
 * Page title component for the page.
 * @param {*} text
 * @returns Page title component
 */
function PageTitle({ text }) {
  return <h2 className="page-title">{text}</h2>;
}

export default PageTitle;
