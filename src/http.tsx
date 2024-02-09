import axios from "axios";

const base = "https://invoiceappbackend.netlify.app";

const http = axios.create({
  baseURL: base,
});

export default http;
