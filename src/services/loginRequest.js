import axios from "axios";

export const loginFunction = async (userAndPassword) => {
  const headers = { Authorization: `"Basic ${btoa(userAndPassword)}"` };
  try {
    const {data} = await axios.post(
      "https://api.staging.genoma.work/api/v1/accounts/login/",
      {},
      { headers }
    );
    return data;
  } catch {
    throw new Error(true);
  }
};
