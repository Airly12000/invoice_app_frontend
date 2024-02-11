import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getDate, statusButton, capitalize } from "../components/Utilities";
import ValidationModal from "../components/ValidationModal";
import { Context } from "../App";
import EditInvoiceCanvas from "../components/EditInvoiceCanvas";
import http from "../http";

// interface Props {
//   modalTitle: string;
//   modalBody: string;
//   modalButton: string;
//   setModalTitle: any;
//   setModalBody: any;
//   setModalButton: any;
// }

function InvoiceDetails() {
  // const { id } = useParams<string>("id");
  const { id } = useParams<string>();
  const [invoice, setInvoice] = useState<any>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    modalTitle,
    modalBody,
    modalButton,
    setModalTitle,
    setModalBody,
    setModalButton,
  } = useContext(Context);

  useEffect(() => {
    if (invoice === undefined) {
      http
        .get("/api/invoices/getInvoiceItems/" + id)
        .then((response) => {
          setInvoice(response.data.invoice[0]);
          // console.log(response.data.invoice[0]);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  const handleDelete = () => {
    setModalTitle("Confirm Deletion");
    setModalBody(
      `Are you sure you want to delete invoice #${id}? This action cannot be undone.`
    );
    setModalButton("deleteButton");
    setOpenModal(true);
  };

  const handleMark = () => {
    setModalTitle("Confirm Status");
    setModalBody(
      `Are you sure you want to change status of invoice #${id}? This action cannot be undone.`
    );
    setModalButton("markButton");
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    if (modalButton === "markButton") {
      await http
        .put("/api/invoices/markPaid/" + id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(`Error: ${error}`));
      window.location.reload();
    } else if (modalButton === "deleteButton") {
      await http
        .delete("/api/invoices/deleteInvoice/" + id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(`Error: ${error}`));
      window.location.replace("/");
    }
  };

  if (isLoading) {
    return (
      <div className="col row overflow-auto mt-lg-4x">
        <div className="col pt-4 m-3">
          <a href="/" className="goBack">
            <svg
              className="gb-i"
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
              <path d="M730.6 18.4l-505.4 505.2 505.4 505.4 144.8-144.8-360.6-360.6 360.6-360.4z"></path>
            </svg>
            <span className="f-w fs-12 ms-4 col-black">Go back</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="col row overflow-auto mt-lg-4x">
      <ValidationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={modalTitle}
        modalBody={modalBody}
        modalButton={modalButton}
        handleSubmit={handleSubmit}
      />
      <EditInvoiceCanvas inv={invoice} />
      <div className="col pt-4 m-3">
        <a href="/" className="goBack">
          <svg
            className="gb-i"
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
            <path d="M730.6 18.4l-505.4 505.2 505.4 505.4 144.8-144.8-360.6-360.6 360.6-360.4z"></path>
          </svg>
          <span className="f-w fs-12 ms-4 col-black">Go back</span>
        </a>
        <div
          className="d-flex flex-row card my-4 border border-0 py-4 px-4 f-w fs-12 animate-other"
          id="topDetails"
        >
          <div className="d-flex flex-row align-items-center justify-content-start flex-grow-1">
            <span className="me-auto me-md-3 text-color">Status</span>
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
              <span className="fs-12 f-w">{capitalize(invoice.status)}</span>
            </span>
          </div>
          <div className="d-none d-md-block" id="variant">
            {invoice.status !== "paid" && (
              <button
                className="btn btn-secondary border border-0 rounded-pill mx-1"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                id="editButton"
              >
                <span className="f-w fs-12">Edit</span>
              </button>
            )}
            <button
              className="btn btn-danger border border-0 rounded-pill mx-1"
              id="deleteButton"
              onClick={handleDelete}
            >
              <span className="f-w fs-12">Delete</span>
            </button>
            {invoice.status === "pending" && (
              <button
                className="btn btn-primary border border-0 rounded-pill mx-1"
                id="markButton"
                onClick={handleMark}
              >
                <span className="f-w fs-12">Mark as Paid</span>
              </button>
            )}
          </div>
        </div>
        <div
          className="d-flex flex-column card my-4 border border-0 py-3 pt-5 px-5 f-w fs-12 animate-other"
          id="mainDetails"
        >
          <div className="d-flex flex-column flex-md-row w-100 mb-3">
            <div className="flex-grow-1 mb-3 mb-md-0">
              <div className="col col-black">
                <span className="text-color">#</span>
                {invoice.id}
              </div>
              <div className="col text-color">
                {invoice.description ? invoice.description : ""}
              </div>
            </div>
            <div className="flex-shrink-1 text-start text-md-end text-color">
              <div className="col">
                {invoice.senderAddress ? invoice.senderAddress.street : ""}
              </div>
              <div className="col">
                {invoice.senderAddress ? invoice.senderAddress.city : ""}
              </div>
              <div className="col">
                {invoice.senderAddress ? invoice.senderAddress.postCode : ""}
              </div>
              <div className="col">
                {invoice.senderAddress ? invoice.senderAddress.country : ""}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row w-100">
            <div className="d-flex flex-row flex-fill mb-3 mb-md-0">
              <div className="d-flex flex-fill flex-column">
                <div className="col mb-4">
                  <div className="col text-color">Invoice Date</div>
                  <div className="col col-black">
                    {getDate(invoice.createdAt)}
                  </div>
                </div>
                <div className="col">
                  <div className="col text-color">Payment Due</div>
                  <div className="col col-black">
                    {getDate(invoice.paymentDue)}
                  </div>
                </div>
              </div>
              <div className="flex-fill text-color">
                <div className="col">Bill to</div>
                <div className="col col-black">{invoice.clientName}</div>
                <div className="col">
                  {invoice.clientAddress ? invoice.clientAddress.street : ""}
                </div>
                <div className="col">
                  {invoice.clientAddress ? invoice.clientAddress.city : ""}
                </div>
                <div className="col">
                  {invoice.clientAddress ? invoice.clientAddress.postCode : ""}
                </div>
                <div className="col">
                  {invoice.clientAddress ? invoice.clientAddress.country : ""}
                </div>
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="col text-color">Sent to</div>
              <div className="col col-black">
                {invoice.clientEmail ? invoice.clientEmail : ""}
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column card my-4 rounded border border-0 pt-4 f-w fs-12"
            id="items"
          >
            <div className="d-flex flex-column px-3 pb-2 flex-fill col-white">
              <div className="d-none d-md-flex mb-3 text-color">
                <div className="col col-md-5">Item Name</div>
                <div className="col d-none d-md-flex flex-row">
                  <div className="col text-center">Qty</div>
                  <div className="col text-end">Price</div>
                </div>
                <div className="col col-md-3 text-end">Total</div>
              </div>
              {invoice.items.length !== 0 &&
                invoice.items.map((item: any, index: any) => {
                  return (
                    <div className="d-flex mb-3" key={index}>
                      <div className="col col-md-5 d-flex flex-column col-black">
                        <span>{item.name} </span>
                        <span className="d-block d-md-none mt-2 text-color">
                          {item.quantity} x $ {item.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="col d-none d-md-flex flex-row text-color">
                        <div className="col text-center">{item.quantity}</div>
                        <div className="col text-end">
                          $ {item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="col col-md-3 text-end align-self-center col-black">
                        $ {item.total.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className="d-flex flex-row rounded-bottom py-4 px-5 w-100"
              id="divAmtDue"
              style={{ color: "white" }}
            >
              <div className="flex-grow-1">Amount Due</div>
              <div className="flex-fill text-end">
                ${" "}
                {invoice.total !== undefined
                  ? invoice.total.toFixed(2)
                  : "0.00"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="nav sticky-bottom d-flex d-md-none py-4 px-3 bg-footer"
        id="foot"
      >
        <div className="d-flex flex-row w-100 justify-content-center">
          {invoice.status !== "paid" && (
            <div className="text-center" id="variant">
              <button
                className="btn btn-secondary border border-0 rounded-pill mx-1"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                id="editButton"
              >
                <span className="f-w fs-12">Edit</span>
              </button>
            </div>
          )}
          <div className="text-center">
            <button
              className="btn btn-danger border border-0 rounded-pill mx-1"
              onClick={handleDelete}
              id="deleteButton"
            >
              <span className="f-w fs-12">Delete</span>
            </button>
          </div>
          {invoice.status === "pending" && (
            <div className="text-center">
              <button
                className="btn btn-primary border border-0 rounded-pill mx-1"
                onClick={handleMark}
                id="markButton"
              >
                <span className="f-w fs-12">Mark as Paid</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default InvoiceDetails;
