import axios from "axios";

// Base URL
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
  logo: string[];
  Menu: MenuItem[];
  Icon: IconItem[];
}

export const fetchNavbarData = async (): Promise<NavbarDataProps | null> => {
  try {
    const response = await axios.get<NavbarDataProps>(`${API_BASE_URL}/navbar`);
    return response.data;
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    return null;
  }
};
