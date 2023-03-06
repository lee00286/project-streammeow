import React, { useEffect, useState } from "react";
import "../PurchasePage.css";

const taxCalculate = (price, taxRate) => {
  if (!price || !taxRate) return;
  return ((price * taxRate) / 100).toFixed(2);
};

const addCalculate = (left, right) => {
  if (!left || !right) return;
  return (parseFloat(left) + parseFloat(right)).toFixed(2);
};

/**
 * Invoice table that shows invoice of purchase.
 * @param {*} items: List of selected item to purchase
 * @returns Invoice table component
 */
function InvoiceTable({ buyList }) {
  const [BuyList, setBuyList] = useState(null);
  const [Price, setPrice] = useState(null);

  useEffect(() => {
    if (!buyList) return;
    setBuyList(buyList);
    let priceObject = {
      price: buyList.price,
      tax: taxCalculate(buyList.price, 12.5),
    };
    priceObject.total = addCalculate(priceObject.price, priceObject.tax);
    setPrice(priceObject);
  }, [buyList]);

  const tableRow = (item, quantity, price, space) => {
    return (
      <div className={`table-row row ${space ? "table-row-space" : ""}`}>
        <div className="col-auto text-l">{item}</div>
        <div className="col-3 text-r">{quantity}</div>
        <div className="col-2 text-r">{price}</div>
      </div>
    );
  };

  if (!BuyList) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <div className="table-header row">
        <div className="col-auto text-l">Item</div>
        <div className="col-3 text-r">Quantity</div>
        <div className="col-2 text-r">Price</div>
      </div>
      <div className="table-section col">
        {tableRow(BuyList.item, BuyList.quantity, Price.price)}
      </div>
      <div className="table-section col">
        {tableRow("SUBTOTAL", null, BuyList.price, true)}
        {tableRow("Tax (12.5%)", null, Price.tax)}
      </div>
      <div className="table-section col no-border">
        {tableRow("TOTAL", null, Price.total)}
      </div>
    </div>
  );
}

export default InvoiceTable;
