import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "36adc9c89cmsh9a29989a171b9afp13b519jsn97cd3c63fb9f",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
