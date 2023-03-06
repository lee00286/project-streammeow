import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import module from "../../ApiService";
import "../Buttons/Buttons.css";

/* Get query */
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

/* Put string zero in front of the date/time if it's less than 10. */
const dateZero = (num) => {
  if (num < 10) return `0${num}`;
  return `${num}`;
};

/* Convert date into proper text format. */
const convertDate = (date) => {
  let d = new Date(date);
  let new_date = `${d.getFullYear()}-${dateZero(
    d.getMonth() + 1
  )}-${d.getDate()},`;
  new_date += ` ${dateZero(d.getHours())}:${dateZero(d.getMinutes())}`;
  return new_date;
};

/* Convert balance to actual amount. */
const convertBalance = (balance) => {
  return (balance / 100).toFixed(2);
};

/**
 * Payment confirmation page.
 * @returns ConfirmPage component
 */
function ConfirmPage() {
  let query = useQuery();

  const [Invoice, setInvoice] = useState(null);

  useEffect(() => {
    module
      .getSession(query.get("session_id"))
      .then((res) => {
        console.log(res.data);
        if (res.data.error) console.log(res.data.error);
        else return res.data;
      })
      .then((data) => {
        module.summarizePayment(data.invoice).then((res) => {
          console.log(res.data);
          setInvoice(res.data);
        });
      });
  }, []);

  /* Row for payment details */
  const invoiceRow = (label, detail) => {
    return (
      <div className="invoice-row row">
        <div className="invoice-label col-5">{label}</div>
        <div className="invoice-detail col-5">{detail}</div>
      </div>
    );
  };

  return (
    <div className="invoice page">
      {Invoice && (
        <div className="invoice-ticket col">
          <div className="invoice-top">
            <img src="/icons/complete.png" className="no-select" />
            <h2>Payment Received</h2>
            <p>
              Your payment has been confirmed.
              <br />A confirmation email has been sent to{" "}
              <span>{Invoice.customerInfo.email}</span>
            </p>
          </div>
          <div className="horizontal-line">
            <span>PAYMENT DETAILS</span>
          </div>
          <div className="invoice-bottom">
            {invoiceRow("Invoice Number", Invoice.invoiceNum)}
            {invoiceRow("Payment Date", convertDate(Invoice.payment.datePaid))}
            {invoiceRow("Currency", Invoice.currency)}
            {invoiceRow("Payment Total", Invoice.payment.amountPaid)}
            {invoiceRow("Balance", convertBalance(Invoice.payment.balance))}
            <div className="invoice-button no-select">
              <a
                href={Invoice.invoicePDF}
                download={`Invoice-${Invoice.invoiceNum}`}
                className="button rounded-1 color-button"
              >
                Download Invoice
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmPage;
