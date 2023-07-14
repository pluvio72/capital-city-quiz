import { API_ROUTES } from "../constants/api";

export const fetchCountries = async () => {
  try {
    const response = await fetch(API_ROUTES.countries);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};