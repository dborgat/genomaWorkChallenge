import axios from "./axiosConfig";

export const getRestaurants = async (userToken) => {
  try {
    const { data } = await axios.get("/restaurants/");
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
    await axios.post("/restaurants/", {
      name,
      food,
      location,
      rating,
      visited,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteRestaurant = async (restoPk, userToken) => {
  try {
    const { data } = await axios.delete(`/restaurants/${restoPk}/`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const editRestaurants = async (restoPk, userToken, body) => {
  const { name, food, location, rating, visited } = body;
  try {
    const resp = await axios.put(
      `https://genoma-challenge-app.herokuapp.com/restaurants/${restoPk}/`,
      {
        name,
        food,
        location,
        rating,
        visited,
      }
    );
    return resp;
  } catch (e) {
    throw new Error(e);
  }
};
