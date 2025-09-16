export const API_BASE_URL = "http://localhost:3001";

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
  createdAt?: string; // optional
}

// Helper to convert image path to full URL
const withFullImagePath = (blog: Blog): Blog => ({
  ...blog,
  image: blog.image.startsWith("http")
    ? blog.image
    : `${API_BASE_URL}${blog.image}`,
});

// Fetch all blogs
export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch blogs: ${response.status}`);

    const data: Blog[] = await response.json();
    // Map all images to full URL
    return data.map(withFullImagePath);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

// Fetch single blog by id
export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);

    if (!response.ok) throw new Error(`Failed to fetch blog with id ${id}`);

    const data: Blog = await response.json();
    return withFullImagePath(data);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

// Create new blog
export const createBlog = async (
  blog: Omit<Blog, "id" | "createdAt">
): Promise<Blog | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
