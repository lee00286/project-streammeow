import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

function ConfirmPage() {
  let query = useQuery();

  const [Invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/payments/session/${query.get("session_id")}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) console.log(res.data.error);
        else return res.data;
      })
      .then((data) => {
        console.log(data);
        const variables = { invoiceId: data.invoice };
        axios.post("/api/payments/summarize", variables).then((res) => {
          console.log(res.data);
          setInvoice(res.data);
        });
      });
  }, []);

  const onDownload = () => {
    window.open(Invoice.invoicePDF);
  };

  return (
    <div className="invoice">
      ConfirmPage
      {Invoice && (
        <div className="invoice-ticket">
          <div>
            <h3>
              {Invoice.currency} {Invoice.payment.amountPaid}
            </h3>
          </div>
          <p>Invoice Number: {Invoice.invoiceNum}</p>
          <p>Payment Date: {Invoice.payment.datePaid}</p>
          <a
            href={Invoice.invoicePDF}
            download={`Invoice-${Invoice.invoiceNum}`}
          >
            Download Invoice
          </a>
        </div>
      )}
    </div>
  );
}

export default ConfirmPage;
