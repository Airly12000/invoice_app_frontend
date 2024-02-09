import React, { useState } from "react";
import {
  formatDate,
  validateInvoice,
  validateEmail,
  validateItems,
  validateItemName,
  createInvoiceObject,
} from "./Utilities";
import http from "../http";

interface Props {
  inv: any;
}

function EditInvoiceCanvas({ inv }: Props) {
  const [items, setItems] = useState(inv.items);
  const [senderAddress, setSenderAddress] = useState(inv.senderAddress);
  const [clientAddress, setClientAddress] = useState(inv.clientAddress);
  const [invoice, setInvoice] = useState(inv);
  const [date, setDate] = useState(inv.createdAt);
  const [show, setShow] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { quantity: 0, price: 0, total: 0 }]);
  };

  const handleRemoveItem = (index: any) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateItemTotal = (index: any) => {
    const total =
      parseFloat(items[index].price) * parseFloat(items[index].quantity);

    if (isNaN(total)) {
      return 0;
    }
    return total;
  };

  const handleChange = (event: any, index?: any) => {
    const name = event.target.name;
    let value = event.target.value;
    let inputData = [...items];
    switch (name) {
      case "senderStreetAddress":
        setSenderAddress({
          ...senderAddress,
          street: value,
        });
        break;
      case "senderCity":
        setSenderAddress({
          ...senderAddress,
          city: value,
        });
        break;
      case "senderPostCode":
        setSenderAddress({
          ...senderAddress,
          postCode: value,
        });
        break;
      case "senderCountry":
        setSenderAddress({
          ...senderAddress,
          country: value,
        });
        break;
      case "clientStreetAddress":
        setClientAddress({
          ...clientAddress,
          street: value,
        });
        break;
      case "clientCity":
        setClientAddress({
          ...clientAddress,
          city: value,
        });
        break;
      case "clientPostCode":
        setClientAddress({
          ...clientAddress,
          postCode: value,
        });
        break;
      case "clientCountry":
        setClientAddress({
          ...clientAddress,
          country: value,
        });
        break;
      case "clientName":
        setInvoice({
          ...invoice,
          clientName: value,
        });
        break;
      case "clientEmail":
        setInvoice({
          ...invoice,
          clientEmail: value,
        });
        break;
      case "invoiceDate":
        setDate(value);
        setInvoice({
          ...invoice,
          createdAt: formatDate(value),
        });
        break;
      case "paymentTerms":
        setInvoice({
          ...invoice,
          paymentTerms: parseInt(value),
        });
        break;
      case "projectDescription":
        setInvoice({
          ...invoice,
          description: value,
        });
        break;
      case "itemName":
        inputData[index].name = value;
        setItems(inputData);
        break;
      case "itemQty":
        inputData[index].quantity = parseFloat(value);
        inputData[index].total = calculateItemTotal(index);
        setItems(inputData);
        break;
      case "itemPrice":
        inputData[index].price = parseFloat(value);
        inputData[index].total = calculateItemTotal(index);
        setItems(inputData);
        break;
      default:
        break;
    }
  };

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    const total = items.reduce((a: any, v: any) => (a += v.total), 0);
    const finalInvoice = createInvoiceObject({
      ...invoice,
      senderAddress,
      clientAddress,
      items,
      status: "pending",
      date: date,
      total,
    });
    console.log(finalInvoice);
    if (validateInvoice(finalInvoice) && validateItems(finalInvoice.items)) {
      await http
        .put("/api/invoices/updateInvoice/" + inv.id, finalInvoice)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(`error : ${error}`));
      window.location.reload();
    } else {
      setShow(true);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-start f-w ps-3 ps-lg-4"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <nav className="sticky-top w-100 mt-4 text-start pt-3" id="canvasNav">
        <a
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
          className="goBack d-inline d-md-none mb-3"
        >
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
          <span className="f-w fs-12 ms-2 col-black">Go back</span>
        </a>
        <h5
          className="offcanvas-title w-100 f-w pt-4 ps-3 mb-1 col-black"
          id="offcanvasExampleLabel"
        >
          Edit <span className="text-color">#</span>
          {invoice.id}
        </h5>
      </nav>
      <div className="offcanvas-body mt-2 fs-12 mb-16 text-color" id="inputs">
        <form className="d-flex flex-column">
          <div className="sender d-flex flex-column">
            <span className="mb-3 col-purple">Bill from</span>
            <div className="mb-3">
              <div className="d-flex justify-content-evenly">
                <label htmlFor="" className="form-label me-auto">
                  Street Address
                </label>
                {show && !senderAddress.street && (
                  <label htmlFor="" className="form-label red">
                    can't be empty
                  </label>
                )}
              </div>
              <input
                type="text"
                className="form-control py-3 px-4"
                value={senderAddress ? senderAddress.street : ""}
                onChange={handleChange}
                name="senderStreetAddress"
                id="senderStreetAddress"
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="d-flex justify-content-evenly">
                  <label htmlFor="" className="form-label me-auto">
                    City
                  </label>
                  {show && !senderAddress.city && (
                    <label htmlFor="" className="form-label red">
                      can't be empty
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control py-3 px-4"
                  value={senderAddress ? senderAddress.city : ""}
                  onChange={handleChange}
                  name="senderCity"
                  id="senderCity"
                />
              </div>
              <div className="col">
                <div className="d-flex justify-content-evenly">
                  <label htmlFor="" className="form-label me-auto">
                    Post Code
                  </label>
                  {show && !senderAddress.postCode && (
                    <label htmlFor="" className="form-label red">
                      can't be empty
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control py-3 px-4"
                  value={senderAddress ? senderAddress.postCode : ""}
                  onChange={handleChange}
                  name="senderPostCode"
                  id="senderPostCode"
                />
              </div>
              <div className="col-md mt-3 mt-md-0">
                <div className="d-flex justify-content-evenly">
                  <label htmlFor="" className="form-label me-auto">
                    Country
                  </label>
                  {show && !senderAddress.country && (
                    <label htmlFor="" className="form-label red">
                      can't be empty
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control py-3 px-4"
                  value={senderAddress ? senderAddress.country : ""}
                  onChange={handleChange}
                  name="senderCountry"
                  id="senderCountry"
                />
              </div>
            </div>
          </div>
          <div className="sender d-flex flex-column mt-4">
            <span className="mb-3 col-purple">Bill to</span>
            <div className="mb-3">
              <div className="d-flex justify-content-evenly">
                <label htmlFor="" className="form-label me-auto">
                  Name
                </label>
                {show && !invoice.clientName && (
                  <label htmlFor="" className="form-label red">
                    can't be empty
                  </label>
                )}
              </div>
              <input
                type="text"
                className="form-control py-3 px-4"
                value={invoice.clientName ? invoice.clientName : ""}
                onChange={handleChange}
                name="clientName"
                id="clientName"
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-evenly">
                <label htmlFor="" className="form-label me-auto">
                  Email
                </label>
                {show && !validateEmail(invoice.clientEmail) && (
                  <label htmlFor="" className="form-label red">
                    invalid email
                  </label>
                )}
              </div>
              <input
                type="email"
                className="form-control py-3 px-4"
                value={invoice.clientEmail ? invoice.clientEmail : ""}
                onChange={handleChange}
                name="clientEmail"
                id="clientEmail"
                placeholder="e.g. email@example.com"
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-evenly">
                <label htmlFor="" className="form-label me-auto">
                  Street Address
                </label>
                {show && !clientAddress.street && (
                  <label htmlFor="" className="form-label red">
                    can't be empty
                  </label>
                )}
              </div>
              <input
                type="text"
                className="form-control py-3 px-4"
                value={clientAddress ? clientAddress.street : ""}
                onChange={handleChange}
                name="clientStreetAddress"
                id="clientStreetAddress"
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="d-flex justify-content-evenly">
                  <label htmlFor="" className="form-label me-auto">
                    City
                  </label>
                  {show && !clientAddress.city && (
                    <label htmlFor="" className="form-label red">
                      can't be empty
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control py-3 px-4"
                  value={clientAddress ? clientAddress.city : ""}
                  onChange={handleChange}
                  name="clientCity"
                  id="clientCity"
                />
              </div>
              <div className="col">
                <div className="d-flex justify-content-evenly">
                  <label htmlFor="" className="form-label me-auto">
                    Post Code
                  </label>
                  {show && !clientAddress.postCode && (
                    <label htmlFor="" className="form-label red">
                      can't be empty
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control py-3 px-4"
                  value={clientAddress ? clientAddress.postCode : ""}
                  onChange={handleChange}
                  name="clientPostCode"
                  id="clientPostCode"
                />
              </div>
              <div className="col-md mt-3 mt-md-0">
                <div className="d-flex justify-content-evenly">
                  <label htmlFor="" className="form-label me-auto">
                    Country
                  </label>
                  {show && !clientAddress.country && (
                    <label htmlFor="" className="form-label red">
                      can't be empty
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control py-3 px-4"
                  value={clientAddress ? clientAddress.country : ""}
                  onChange={handleChange}
                  name="clientCountry"
                  id="clientCountry"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Invoice Date
                </label>
                <input
                  type="date"
                  className="form-control py-3 px-4"
                  value={invoice.createdAt}
                  onChange={handleChange}
                  name="invoiceDate"
                  id="invoiceDate"
                />
              </div>
              <div className="col-md mt-3 mt-md-0">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Payment Terms
                </label>
                <select
                  className="form-select py-3 px-4"
                  aria-label="Default select example"
                  onChange={handleChange}
                  value={invoice.paymentTerms}
                  name="paymentTerms"
                  id="paymentTerms"
                >
                  <option value={1}>Net 1 Day</option>
                  <option value={7}>Net 7 Days</option>
                  <option value={14}>Net 14 Days</option>
                  <option value={30} selected>
                    Net 30 Days
                  </option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-evenly">
                <label htmlFor="" className="form-label me-auto">
                  Project Description
                </label>
                {show && !invoice.description && (
                  <label htmlFor="" className="form-label red">
                    can't be empty
                  </label>
                )}
              </div>
              <input
                type="text"
                placeholder="eg. Graphic Design"
                className="form-control py-3 px-4"
                value={invoice.description ? invoice.description : ""}
                onChange={handleChange}
                name="projectDescription"
                id="projectDescription"
              />
            </div>
          </div>
          <div className="sender d-flex flex-column mt-4 mb-2">
            <span className="mb-3 fs-18">Items List</span>
            {items.map((item: any, index: any) => {
              return (
                <div key={index} className="row mb-3">
                  <div className="col-md-5 mb-3 mb-md-0">
                    <div className="d-flex justify-content-evenly">
                      <label htmlFor="" className="form-label me-auto">
                        Item Name
                      </label>
                      {show && !validateItemName(item) && (
                        <label htmlFor="" className="form-label red">
                          can't be empty
                        </label>
                      )}
                    </div>
                    <input
                      type="text"
                      className="form-control py-3 px-4"
                      value={item.name}
                      onChange={(event) => handleChange(event, index)}
                      name="itemName"
                      id="itemName"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Qty
                    </label>
                    <input
                      type="text"
                      className="form-control py-3 px-4 px-md-2"
                      value={item.quantity}
                      onChange={(event) => handleChange(event, index)}
                      name="itemQty"
                      id="itemQty"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control py-3 px-4 px-md-2"
                      value={item.price}
                      onChange={(event) => handleChange(event, index)}
                      name="itemPrice"
                      id="itemPrice"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Total
                    </label>
                    <input
                      type="text"
                      className="form-control py-3 px-4 px-md-2 border border-0 bg-transparent w-100"
                      value={item.total}
                      name="itemTotal"
                      id="itemTotal"
                      defaultValue="0"
                      disabled
                    />
                  </div>
                  <div className="col-1 d-flex align-items-center justify-content-center pt-3">
                    <button
                      type="button"
                      className="btn btn-transparent"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className="btn btn-secondary rounded-pill mt-1 mb-2 border border-0"
              id="editButton"
              onClick={handleAddItem}
            >
              <span className="f-w fs-12">+ Add New Item</span>
            </button>
          </div>
          {show &&
            !validateInvoice({
              ...invoice,
              clientAddress: clientAddress,
              senderAddress: senderAddress,
            }) && (
              <span className="red align-self-start">
                - All fields must be added!
              </span>
            )}
          {show && !validateEmail(invoice.clientEmail) && (
            <span className="red align-self-start">
              - The email must be correct!
            </span>
          )}
          {show && !validateItems(items) && (
            <span className="red align-self-start">
              - An item must be added!
            </span>
          )}
        </form>
      </div>
      <nav className="nav sticky-bottom d-flex py-4 px-4" id="canvasFooter">
        <div className="d-flex flex-row w-100 justify-content-center">
          <div className="text-center me-md-auto"></div>
          <div className="text-center">
            <button
              className="btn border border-0 rounded-pill mx-2"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              id="editButton"
            >
              <span className="f-w fs-12">Discard</span>
            </button>
          </div>
          <div className="text-center">
            <button
              className="btn border border-0 rounded-pill mx-2"
              onClick={handleUpdate}
              id="markButton"
            >
              <span className="f-w fs-12">Save & Send</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default EditInvoiceCanvas;
