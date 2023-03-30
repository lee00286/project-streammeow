import React from "react";
import { creditList } from "./creditList";
import PageTitle from "../Texts/PageTitle";
import SubTitle from "../Texts/SubTitle";
import "./CreditPage.css";

/**
 * Credit page component that displays credits for the project.
 * @returns Credit page component
 */
function CreditPage() {
  const onLink = (link) => {
    window.open(link, "_blank");
  };

  /* Display credit by categories */
  const credits =
    creditList !== null && creditList.length > 0 ? (
      creditList.map((credit, index) => {
        // Display a list of credit items
        const creditItems = credit.credits.map((creditItem, index) => {
          return (
            <div
              key={`creditItem-${index}`}
              className="credit-item"
              onClick={() => onLink(creditItem.link)}
            >
              {creditItem.siteName
                ? `[${creditItem.siteName}] ${creditItem.name}`
                : creditItem.name}
              <p className="credit-link">{creditItem.link}</p>
            </div>
          );
        });

        return (
          <div key={`credit-${index}`} className="credit-box col">
            <SubTitle text={credit.title} />
            <div className="credit-items col">{creditItems}</div>
          </div>
        );
      })
    ) : (
      <div className="credit-box">Empty Credit List</div>
    );

  return (
    <div className="grid-body page">
      <PageTitle text="Credits" />
      <p className="credit-subtitle">Click the link to visit the page.</p>
      <div className="credit-container row">{credits}</div>
    </div>
  );
}

export default CreditPage;
