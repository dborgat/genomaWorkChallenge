import axiosConfig from "./axiosConfig";

export const getRestaurants = async () => {
  try {
    const { data } = await axiosConfig.get("/restaurants/");
    console.log(
      "🚀 ~ file: restoRequest.js ~ line 10 ~ getRestaurants ~ resp",
      data
    );
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const addRestaurant = async (body) => {
  const { name, food, location, rating, visited } = body;
  try {
    await axiosConfig.post("/restaurants/", {
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

export const deleteRestaurant = async (restoPk) => {
  try {
    const { data } = await axiosConfig.delete(`/restaurants/${restoPk}/`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const editRestaurants = async (restoPk, body) => {
  const { name, food, location, rating, visited } = body;
  try {
    const resp = await axiosConfig.put(
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
