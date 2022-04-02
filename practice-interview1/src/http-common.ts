import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3110/api",
  headers: {
    "Content-type": "application/json"
  }
});
