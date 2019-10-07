import axios from "axios";

async function getData(page) {
  const { data } = await axios.get(
    "https://fresh-rope-219511.appspot.com/?page=" + page
  );
  return data;
}
