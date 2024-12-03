import axios from "axios";

axios.defaults.baseURL = "https://blog-application.vercel.app";

const customAxios = (endpoint, method, data = null, header = null) => {
  return new Promise((resolve, reject) => {
    axios({
      url: endpoint,
      method: method,
      data: data,
      headers: header
        ? header
        : {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("JsonToken")}`,
          },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default customAxios;
