import axios from "axios";

const instance = axios.create({
   baseURL: "http://localhost:8080/"  //dev 
  // baseURL:  //prod
});
export default instance;
