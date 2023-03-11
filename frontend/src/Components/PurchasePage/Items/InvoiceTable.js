import React, { useEffect, useState } from "react";
import "../PurchasePage.css";

const taxCalculate = (price, taxRate) => {
  if (!price || !taxRate) return;
  return (price * taxRate) / 100;
};

const addCalculate = (left, right) => {
  if (!left || !right) return;
  if (typeof left === "string" || typeof right === "string")
    return parseFloat(left) + parseFloat(right);
  return left + right;
};

/* Round to 2 decimal places */
const roundNum = (num, digits, base) => {
  var pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
};

/**
 * Invoice table that shows invoice of purchase.
 * @param {Object} buyList: a selected item to purchase
 * @param {Function} totalCost: function for PurchasePage to get total cost
 * @returns Invoice table component
 */
function InvoiceTable({ buyList, totalCost }) {
  const [BuyList, setBuyList] = useState(null);
  const [Price, setPrice] = useState(null);

  useEffect(() => {
    if (!buyList) return;
    // Set prices of the selected buyList
    setBuyList(buyList);
    let priceObject = {
      price: buyList.price,
      tax: taxCalculate(buyList.price, 12.5),
    };
    priceObject.total = addCalculate(priceObject.price, priceObject.tax);
    setPrice(priceObject);
    // Send total cost to PurchasePage component
    if (totalCost) totalCost(priceObject.total);
  }, [buyList, totalCost]);

  // Row of the table body
  const tableRow = (item, quantity, price, space) => {
    return (
      <div className={`table-row row ${space ? "table-row-space" : ""}`}>
        <div className="col-auto text-l">{item}</div>
        <div className="col-3 text-r">{quantity}</div>
        <div className="col-2 text-r">{price}</div>
      </div>
    );
  };

  // If none of the buy item is selected
  if (!BuyList || !Price) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <div className="table-header row no-select">
        <div className="col-auto text-l">Item</div>
        <div className="col-3 text-r">Quantity</div>
        <div className="col-2 text-r">Price</div>
      </div>
      <div className="table-section col">
        {tableRow(BuyList.item, BuyList.quantity, Price.price)}
      </div>
      <div className="table-section col">
        {tableRow("SUBTOTAL", null, BuyList.price, true)}
        {tableRow(
          "Tax (12.5%)",
          null,
          Price.tax ? roundNum(Price.tax, 2) : null
        )}
      </div>
      <div className="table-section col no-border">
        {tableRow("TOTAL", null, Price.total ? roundNum(Price.total, 2) : null)}
      </div>
    </div>
  );
}

export default InvoiceTable;
