// blogsApi.ts
export const API_BASE_URL = "http://localhost:3001";

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

// Default headers for fetch
const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

// Helper: Convert image path to full URL
export const withFullImagePath = (blog: Blog): Blog => ({
  ...blog,
  image: blog.image.startsWith("http")
    ? blog.image
    : `${API_BASE_URL}${blog.image}`,
});

// API Functions

// Fetch all blogs
export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "GET",
      headers: defaultHeaders,
    });

    if (!response.ok)
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);

    const data: Blog[] = await response.json();
    return data.map(withFullImagePath);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

// Fetch single blog by ID
export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "GET",
      headers: defaultHeaders,
    });

    if (!response.ok)
      throw new Error(
        `Failed to fetch blog with id ${id}: ${response.statusText}`
      );

    const data: Blog = await response.json();
    return withFullImagePath(data);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

// Create a new blog
export const createBlog = async (
  blog: Omit<Blog, "id" | "createdAt">
): Promise<Blog | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(blog),
    });

    if (!response.ok) throw new Error("Failed to create blog");

    const data: Blog = await response.json();
    return withFullImagePath(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    return null;
  }
};
