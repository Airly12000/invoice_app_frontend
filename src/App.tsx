import React, { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoices from "./pages/Invoices";
import InvoiceDetails from "./pages/InvoiceDetails";
import NotFound from "./pages/NotFound";

export const Context = React.createContext<any>({});

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Confrim");
  const [modalBody, setModalBody] = useState("Are you sure");
  const [modalButton, setModalButton] = useState("primary");

  return (
    <div>
      <div className="container-fluid" id="mainBody">
        <div className="row">
          <SideBar />
          <div className="col d-flex flex-column vh-90 position-relative">
            <div className="row">
              <div className="col-md-1 col-xl-2"></div>
              <div className="col-md col-lg">
                <Context.Provider
                  value={{
                    openModal,
                    setOpenModal,
                    modalTitle,
                    modalBody,
                    modalButton,
                    setModalTitle,
                    setModalBody,
                    setModalButton,
                  }}
                >
                  <Router>
                    <Routes>
                      <Route path="/" element={<Invoices />} />
                      <Route path="/invoice/:id" element={<InvoiceDetails />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Router>
                </Context.Provider>
              </div>
              <div className="col-md-1 col-xl-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
