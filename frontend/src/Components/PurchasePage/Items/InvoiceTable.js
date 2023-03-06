import React from "react";
import "../PurchasePage.css";

const taxCalculate = (price, taxRate) => {
  return ((price * taxRate) / 100).toFixed(2);
};

/**
 * Invoice table that shows invoice of purchase.
 * @returns Invoice table component
 */
function InvoiceTable() {
  const tableRow = (item, quantity, price, space) => {
    return (
      <div className={`table-row row ${space ? "table-row-space" : ""}`}>
        <div className="col-auto text-l">{item}</div>
        <div className="col-3 text-r">{quantity}</div>
        <div className="col-2 text-r">{price}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="table-header row">
        <div className="col-auto text-l">Item</div>
        <div className="col-3 text-r">Quantity</div>
        <div className="col-2 text-r">Price</div>
      </div>
      <div className="table-section col">{tableRow("Basic Plan", 1, 2.99)}</div>
      <div className="table-section col">
        {tableRow("SUBTOTAL", null, 2.99, true)}
        {tableRow("Tax (12.5%)", null, taxCalculate(2.99, 12.5))}
      </div>
      <div className="table-section col no-border">
        {tableRow("TOTAL", null, 3.37)}
      </div>
    </div>
  );
}

export default InvoiceTable;
