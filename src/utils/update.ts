import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function website() {
  const url = `${process.env.HOST}api/venue`;
  const data = { venue: process.env.VENUE };
  const opt = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_KEY}`,
    },
  };
  for (let retry = 0; retry < 3; retry++) {
    try {
      const response = await axios.post(url, data, opt);
      return response.data;
    }
    catch (error: any) {
      console.error(`嘗試第 ${retry + 1} 次時發生錯誤`);
      if (error.code === "ERR_BAD_REQUEST") {
        console.error(`ERR_BAD_REQUEST 伺服器拒絕存取，請檢查 HOST, VENUE, KEY 設定`);
      }
      else {
        console.error(error);
      }
      await delay(5000);
    }
  }  
  return {};
}