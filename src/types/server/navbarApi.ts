import axios from "axios";

export const API_BASE_URL = "http://localhost:3001";

export interface MenuItem {
  id: number;
  title: string;
  href: string;
}

export interface IconItem {
  id: number;
  name: string;
}

export interface NavbarDataProps {
  id: number; 
  logo: string[];
  Menu: MenuItem[];
  Icon: IconItem[];
}

// Fetch navbar data
export const fetchNavbarData = async (): Promise<NavbarDataProps | null> => {
  try {
    const response = await axios.get<NavbarDataProps>(`${API_BASE_URL}/navbar`);
    return response.data;
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    return null;
  }
};

// Update navbar data
export const updateNavbarData = async (data: NavbarDataProps) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/navbar`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating navbar data:", error);
    throw error;
  }
};
