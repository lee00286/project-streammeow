import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import module from "../../ApiService";
import calculations from "../calculations";
import "../Buttons/Buttons.css";

/* Get query */
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

/* Convert balance to actual amount. */
const convertBalance = (balance) => {
  return calculations.roundNum(balance / 100, 2);
};

/* Payment details */
function PaymentDetails({ invoice }) {
  /* Row for payment details */
  const invoiceRow = (label, detail) => {
    return (
      <div className="invoice-row row">
        <div className="invoice-label col-5">{label}</div>
        <div className="invoice-detail col-5">{detail}</div>
      </div>
    );
  };

  if (!invoice) return <div></div>;

  return (
    <div className="invoice-bottom">
      {invoiceRow("Invoice Number", invoice.invoiceNum)}
      {invoiceRow(
        "Payment Date",
        calculations.convertDate(invoice.payment.datePaid)
      )}
      {invoiceRow("Currency", invoice.currency)}
      {invoiceRow("Payment Total", invoice.payment.amountPaid)}
      {invoiceRow("Balance", convertBalance(invoice.payment.balance))}
      <div className="invoice-button no-select">
        <a
          href={invoice.invoicePDF}
          download={`Invoice-${invoice.invoiceNum}`}
          className="button rounded-1 color-button"
        >
          Download Invoice
        </a>
      </div>
    </div>
  );
}

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
        if (res.data.error) console.log(res.data.error);
        else return res.data;
      })
      .then((data) => {
        module
          .summarizePayment(data.invoice)
          .then((res) => {
            if (res.error) return console.log(res.error);
            setInvoice(res.data);
          })
          .catch((e) => console.log(e));
      });
  }, []);

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
          <PaymentDetails invoice={Invoice} />
        </div>
      )}
    </div>
  );
}

export default ConfirmPage;
