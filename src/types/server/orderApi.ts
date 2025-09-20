import axios from "axios";

export interface CartItem {
  id: string; // Unique ID of the item
  image: string; // Image URL or path of the item
  title: string; // Name of the item
  paragraph: string; // Description of the item
  star: number; // Rating (1-5)
  price: number; // Price of a single item
  count: number; // Number of items in stock or similar
  category: string; // Category (drinks, pasta, etc.)
  sku: string; // SKU or product code
  quantity: number; // Quantity purchased in this order
}

export interface Order {
  id: string; // Unique ID of the order
  items: CartItem[]; // Array of items in the order
  subtotal: number; // Subtotal price (without tax or delivery)
  total: number; // Total price
  date: string; // Order date in ISO format
}

export interface UserOrders {
  id: string; // User ID
  name: string; // User name
  email: string; // User email
  orders: Order[]; // Array of orders
}

// Axios instance setup
const API_BASE_URL = "http://localhost:3001"; // API base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Fetch all users who have at least one order
// @returns Array of UserOrders
export const getAllUsersWithOrders = async (): Promise<UserOrders[]> => {
  try {
    // Fetch all users from API
    const { data: users } = await api.get("/users");

    // Filter users with at least one order and map images to absolute URLs
    const usersWithOrders: UserOrders[] = users
      .filter((u: any) => Array.isArray(u.orders) && u.orders.length > 0)
      .map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        orders: u.orders.map((order: Order) => ({
          ...order,
          items: order.items.map((item) => ({
            ...item,
            image: item.image.startsWith("http")
              ? item.image
              : `${API_BASE_URL}${item.image}`, // Absolute URL
          })),
        })),
      }));

    return usersWithOrders;
  } catch (err) {
    console.error("Failed to fetch users with orders:", err);
    return [];
  }
};
