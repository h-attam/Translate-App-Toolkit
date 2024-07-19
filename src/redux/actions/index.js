import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// asenkron thunk aksiyonu
export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    //api isteği atıldı
    const res = await api.get("/getLanguages");

    //payloada return edildi
    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk("translate", async (p) => {
  console.log(p);
  // api ye gönderilecek olan parametreleri belirleme
  const params = new URLSearchParams();
  params.set("source_language", p.sourceLang.value);
  params.set("target_language", p.targetLang.value);
  params.set("text", p.text);
  // api ye gönderilecek eaderi belirledik
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  //api ye isteğini at
  const res = await api.post("/translate", params, {headers});
  
  //payload ı belirle 
  return res.data.data;
});
