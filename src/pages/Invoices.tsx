import React, { useEffect, useState } from "react";
import {
  getDate,
  statusButton,
  capitalize,
  filterLength,
} from "../components/Utilities";
import InvoiceCanvas from "../components/InvoiceCanvas";
import axios from "axios";
import Empty from "../assets/images/illustration-empty.svg";

function Invoices() {
  const [filterArg, setFilterArg] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (invoices.length === 0) {
      axios
        .get("/api/invoices/getInvoices")
        .then((response) => {
          setInvoices(response.data.invoices.reverse());
        })
        .catch((err) => console.log(err));
    }
    setTimeout(() => setIsLoading(false), 1000);
  });

  if (isLoading) {
    return (
      <main className="col row overflow-auto mt-lg-4">
        <InvoiceCanvas />
        <div className="col pt-4">
          <div className="d-flex flex-row m-3">
            <div className="col">
              <h2 className="f-w col-black">Invoices</h2>
              <p className="f-w fs-12 text-color">No invoices</p>
            </div>
            <div className="d-flex align-items-center flex-row-reverse justify-content-evenly">
              <button
                className="rounded-pill newB mx-auto d-flex flex-row align-items-center justify-content-center"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <span className="plus rounded-circle me-lg-1 d-flex f-w-900 pt-1 align-items-center justify-content-center">
                  +
                </span>
                <span className="text mx-1">
                  New <span className="d-none d-lg-inline">Invoice</span>
                </span>
              </button>
              <div className="dropdown-center me-4 f-w fs-12">
                <button
                  className="btn dropdown-toggle border border-0 col-black"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="f-w fs-12">Filter </span>
                  <span className="d-none d-lg-inline f-w fs-12">
                    by status
                  </span>
                </button>
                <ul className="dropdown-menu" id="dropdown">
                  <li className="d-flex align-items-center ps-3 fs-12 mb-2 mt-2">
                    <input
                      type="radio"
                      name="status"
                      id=""
                      className="me-2"
                      onChange={() => setFilterArg("")}
                      defaultChecked
                    />
                    All
                  </li>
                  <li
                    className="d-flex align-items-center ps-3 fs-12 mb-2"
                    onChange={() => setFilterArg("draft")}
                  >
                    <input type="radio" name="status" id="" className="me-2" />
                    Draft
                  </li>
                  <li
                    className="d-flex align-items-center ps-3 fs-12 mb-2"
                    onChange={() => setFilterArg("pending")}
                  >
                    <input type="radio" name="status" id="" className="me-2" />
                    Pending
                  </li>
                  <li
                    className="d-flex align-items-center ps-3 fs-12 mb-2"
                    onChange={() => setFilterArg("paid")}
                  >
                    <input type="radio" name="status" id="" className="me-2" />
                    Paid
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="col row overflow-auto mt-lg-4">
      <InvoiceCanvas />
      <div className="col pt-4">
        <div className="d-flex flex-row m-3">
          <div className="col">
            <h2 className="f-w-900 col-black">Invoices</h2>
            {invoices.length !== 0 ? (
              <p className="f-w fs-12 text-color">
                <span className="d-none d-lg-inline">
                  There{" "}
                  {filterLength(invoices, filterArg) === 1 ? (
                    <span>is</span>
                  ) : (
                    <span>are</span>
                  )}
                </span>{" "}
                {filterLength(invoices, filterArg)}{" "}
                {filterArg === "paid" ? (
                  <span>paid</span>
                ) : filterArg === "pending" ? (
                  <span>pending</span>
                ) : filterArg === "draft" ? (
                  <span>draft</span>
                ) : (
                  <span>total</span>
                )}{" "}
                invoice
                {filterLength(invoices, filterArg) === 1 ? "" : <span>s</span>}
              </p>
            ) : (
              <p className="f-w fs-12 text-color">No invoices</p>
            )}
          </div>
          <div className="d-flex align-items-center flex-row-reverse justify-content-evenly">
            <button
              className="rounded-pill newB mx-auto d-flex flex-row align-items-center justify-content-center"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <span className="plus rounded-circle me-lg-1 d-flex f-w-900 pt-1 align-items-center justify-content-center">
                +
              </span>
              <span className="text mx-1">
                New <span className="d-none d-lg-inline">Invoice</span>
              </span>
            </button>
            <div className="dropdown-center me-4 f-w fs-12">
              <button
                className="btn dropdown-toggle border border-0 col-black"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="f-w fs-12">Filter </span>
                <span className="d-none d-lg-inline f-w fs-12">by status</span>
              </button>
              <ul className="dropdown-menu" id="dropdown">
                <li className="d-flex align-items-center ps-3 fs-12 mb-2 mt-2">
                  <input
                    type="radio"
                    name="status"
                    id=""
                    className="me-2"
                    onChange={() => setFilterArg("")}
                    defaultChecked
                  />
                  All
                </li>
                <li
                  className="d-flex align-items-center ps-3 fs-12 mb-2"
                  onChange={() => setFilterArg("draft")}
                >
                  <input type="radio" name="status" id="" className="me-2" />
                  Draft
                </li>
                <li
                  className="d-flex align-items-center ps-3 fs-12 mb-2"
                  onChange={() => setFilterArg("pending")}
                >
                  <input type="radio" name="status" id="" className="me-2" />
                  Pending
                </li>
                <li
                  className="d-flex align-items-center ps-3 fs-12 mb-2"
                  onChange={() => setFilterArg("paid")}
                >
                  <input type="radio" name="status" id="" className="me-2" />
                  Paid
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-lg-5 f-w fs-12 mb-5">
          {invoices.length !== 0 ? (
            invoices
              .filter((invoice: any) => invoice.status.includes(filterArg))
              .map((invoice: any) => {
                return (
                  <a
                    href={"/invoice/" + invoice.id}
                    id="invoice"
                    className="animate-bottom"
                    key={invoice.id}
                  >
                    <div
                      className="d-flex align-items-md-center flex-md-row justify-content-center card m-3 mx-md-1 mx-lg-2 mx-xl-3 card-hover position-relative"
                      style={{ color: "hsl(231,20%,61%)" }}
                      id="invoiceCard"
                    >
                      <div
                        className="col-md-2 ms-4 ms-md-0 align-self-start align-self-md-center text-center f-w-900 pId col-black"
                        id="pId"
                      >
                        <span style={{ color: "rgb(146, 119, 255)" }}>#</span>
                        {invoice.id}
                      </div>
                      <div className="col-md ms-4 ms-md-0 align-self-start align-self-md-center text-center">
                        Due {getDate(invoice.paymentDue)}
                      </div>
                      <div className="col-md-2 me-4 me-md-0 align-self-end align-self-md-center text-center pName">
                        {invoice.clientName}
                      </div>
                      <div className="col-md ms-4 ms-md-0 align-self-start align-self-md-center fs-16 f-w-900 text-center pPrice col-black">
                        $ {invoice.total ? invoice.total.toFixed(2) : "0.00"}
                      </div>
                      <div className="col-md-2 me-4 me-md-0 align-self-end align-self-md-center d-flex flex-row align-items-center text-center pStatus">
                        <span
                          className={
                            "d-flex flex-row align-items-center justify-content-center rounded border border-0 " +
                            statusButton(invoice.status)
                          }
                        >
                          <i
                            className="bi bi-circle-fill pe-1"
                            style={{
                              fontSize: 0.5 + "rem",
                            }}
                          ></i>
                          <span className="fs-12 f-w">
                            {capitalize(invoice.status)}
                          </span>
                        </span>
                        <span className="d-none d-md-inline ms-3 me-1">
                          <svg
                            color="hsl(252, 94%, 67%)"
                            viewBox="0 0 1024 1024"
                            style={{
                              display: "inline-block",
                              stroke: "currentcolor",
                              fill: "currentcolor",
                              width: 10 + "px",
                              height: 10 + "px",
                            }}
                          >
                            <path d="M328.4 30l-144.8 144.8 337.2 337.2-337.2 337.2 144.8 144.8 482-482z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center pt-5">
              <img src={Empty} id="noInvoice" alt="Empty" />
              <div className="d-flex flex-column col-black mt-5 pt-1 text-center f-n">
                <h3 className="fs-22 mb-3">There is nothing here</h3>
                <div>Create and invoice by clicking the</div>
                <div>
                  <span className="f-w">
                    New <span className="d-none d-lg-inline">Invoice</span>
                  </span>{" "}
                  button and get started
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Invoices;
