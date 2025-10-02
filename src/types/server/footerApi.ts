import axios from "axios";

export const API_BASE_URL = "http://localhost:3001";

export interface CompanyInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

export interface LinkItem {
  id: number;
  title: string;
  href: string;
}

export interface HourItem {
  day: string;
  time: string;
}

export interface Newsletter {
  placeholder: string;
  description: string;
}

export interface SocialItem {
  id: number;
  platform: string;
  href: string;
}

export interface FooterDataProps {
  company: CompanyInfo;
  links: LinkItem[];
  hours: HourItem[];
  newsletter: Newsletter;
  social: SocialItem[];
  copyright: string;
}

export const fetchFooterData = async (): Promise<FooterDataProps | null> => {
  try {
    const response = await axios.get<FooterDataProps>(`${API_BASE_URL}/footer`);
    return response.data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
};


export const updateFooterData = async (data: FooterDataProps) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/footer`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating footer data:", error);
    throw error;
  }
};
