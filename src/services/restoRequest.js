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
    const { data } = await axios.post(
      "https://genoma-challenge-app.herokuapp.com/restaurants/",
      { name, food, location, rating, visited },
      { headers }
    );
    console.log(
      "🚀 ~ file: restoRequest.js ~ line 29 ~ addRestaurant ~ data",
      data
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
    console.log(
      "🚀 ~ file: restoRequest.js ~ line 10 ~ getRestaurants ~ resp",
      data
    );
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
