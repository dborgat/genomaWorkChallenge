import axios from "axios";

const baseURL = "https://genoma-challenge-app.herokuapp.com"
const headers = {
  common: {
    "Content-Type": "application/json",
  },
  post: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
}

const instance = axios.create({baseURL, headers})

instance.interceptors.request.use(async config => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("Token"));
    if (accessToken) {
      config.headers.Authorization = `Token ${accessToken}`
    }
  } catch (e) {
    console.log('Couldnt get token silently', e)
  }
  return config
})

export default instance
