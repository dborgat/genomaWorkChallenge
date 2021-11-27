import axios from "axios";

export const getRestaurants = async (userToken) => {
  try {
    const headers = { Authorization: `Token ${userToken}` };
    const { data } = await axios.get(
      "https://genoma-challenge-app.herokuapp.com/restaurants/",
      { headers }
    );
    console.log(
      "🚀 ~ file: restoRequest.js ~ line 10 ~ getRestaurants ~ resp",
      data
    );
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const addRestaurant = async (body, userToken) => {
  const { name, food, location, rating, visited } = body;
  try {
    const headers = { Authorization: `Token ${userToken}` };
    await axios.post(
      "https://genoma-challenge-app.herokuapp.com/restaurants/",
      { name, food, location, rating, visited },
      { headers }
    );
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteRestaurant = async (restoPk, userToken) => {
  try {
    const headers = { Authorization: `Token ${userToken}` };
    const { data } = await axios.delete(
      `https://genoma-challenge-app.herokuapp.com/restaurants/${restoPk}/`,
      { headers }
    );
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const editRestaurants = async (restoPk, userToken, body) => {
  const { name, food, location, rating, visited } = body;
  try {
    const headers = { Authorization: `Token ${userToken}` };
    const resp = await axios.patch(
      `https://genoma-challenge-app.herokuapp.com/restaurants/${restoPk}/`,
      { name, food, location, rating, visited },
      { headers }
    );
    console.log(
      "🚀 ~ file: restoRequest.js ~ line 56 ~ editRestaurants ~ resp",
      resp
    );
  } catch (e) {
    throw new Error(e);
  }
};
