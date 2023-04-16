import axios from "axios";

// axios.defaults.withCredentials = true;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.common["X-Requested-with"] = "XMLHttpRequest";

// Set the Sanctum token as the default Authorization header
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;

axios.defaults.headers.common["Referer"] = "localhost:8000";

if (
  localStorage.getItem("school") &&
  localStorage.getItem("guard") &&
  localStorage.getItem("token")
) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  axios.defaults.headers.common["X-School"] = localStorage.getItem("school");
  axios.defaults.headers.common["X-Sanctum-Guard"] =localStorage.getItem("guard");
}
