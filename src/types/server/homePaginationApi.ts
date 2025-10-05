import axios from "axios";

export const API_BASE_URL = "http://localhost:3001";

export interface HomePaginationProp {
  id: number;
  header: string;
  title: string;
  description: string;
  image: string;
}

// get data (list)
export const fetchHomePaginationData = async (): Promise<
  HomePaginationProp[] | null
> => {
  try {
    const res = await axios.get<HomePaginationProp[]>(
      `${API_BASE_URL}/HomePagination`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching Home Pagination data:", error);
    return null;
  }
};

// post data (create new)
export const createHomePaginationData = async (
  data: HomePaginationProp
): Promise<HomePaginationProp> => {
  try {
    const res = await axios.post<HomePaginationProp>(
      `${API_BASE_URL}/HomePagination`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error creating Home Pagination:", error);
    throw error;
  }
};

// delete data by id
export const deleteHomePaginationData = async (id: string | number) => {
  try {
    console.log("Requesting delete:", `${API_BASE_URL}/HomePagination/${id}`);
    await axios.delete(`${API_BASE_URL}/HomePagination/${id}`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
