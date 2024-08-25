import axios from "axios";
import { ApiReturn } from "../types";

export const fetchImage = async (
  query: string,
  page: number
): Promise<ApiReturn> => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      orientation: "landscape",
      client_id: "mbIVzLXnl4VjQw86pjNSnYZbw9T2zvmMiYLociwwN-g",
    },
  });

  return response.data;
};
