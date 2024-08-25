import axios from "axios";
import { Images } from "../types";

export const fetchImage = async (
  query: string,
  page: number
): Promise<{ results: Images[]; total_pages: number }> => {
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
