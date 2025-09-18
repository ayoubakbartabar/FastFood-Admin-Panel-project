// blogsApi.ts
import axios from "axios";

// Types
export interface BlogContentBlock {
  type: "paragraph" | "title" | "image";
  text?: string;
}

export interface Blog {
  id: string;
  image: string;
  title: string;
  content: BlogContentBlock[];
  categories: string;
  tags: string[];
  createdAt?: string;
}

// Base URL
export const API_BASE_URL = "http://localhost:3001";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to convert image paths to full URL
api.interceptors.response.use((response) => {
  const transformImage = (blog: Blog): Blog => ({
    ...blog,
    image: blog.image.startsWith("http")
      ? blog.image
      : `${API_BASE_URL}${blog.image}`,
  });

  if (Array.isArray(response.data)) {
    response.data = response.data.map(transformImage);
  } else if (response.data && response.data.id) {
    response.data = transformImage(response.data);
  }

  return response;
});

// API functions
export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const { data } = await api.get<Blog[]>("/blogs");
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const { data } = await api.get<Blog>(`/blogs/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    return null;
  }
};

export const createBlog = async (
  blog: Omit<Blog, "id" | "createdAt">
): Promise<Blog | null> => {
  try {
    const { data } = await api.post<Blog>("/blogs", blog);
    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    return null;
  }
};

export const updateBlog = async (blog: Blog): Promise<Blog | null> => {
  try {
    const { data } = await api.put<Blog>(`/blogs/${blog.id}`, blog);
    return data;
  } catch (error) {
    console.error("Error updating blog:", error);
    return null;
  }
};
