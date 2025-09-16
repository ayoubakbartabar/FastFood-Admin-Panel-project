import axios from "axios";

// Product interface
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string; 
  category: string;
  count: number;
  paragraph?: string;
  star?: number;
  sku?: string;
}

// Base URL for API
export const API_BASE_URL = "http://localhost:3001";

/**
 * Fetch all products
 * Returns array of products with full image URL for frontend display
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);

    // Prepend full API URL to image path
    return response.data.map((product) => ({
      ...product,
      image: product.image.startsWith("http")
        ? product.image
        : `${API_BASE_URL}${product.image}`,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

/**
 * Update a product
 * @param product - Product object with updated values
 * Returns updated product or null on failure
 */
export const updateProduct = async (
  product: Product
): Promise<Product | null> => {
  if (!product.id) {
    console.error("Product ID is missing!");
    return null;
  }

  try {
    // Convert image back to relative path for json-server
    const updatedProduct = {
      ...product,
      image: product.image.replace(API_BASE_URL, ""),
    };

    const response = await axios.put<Product>(
      `${API_BASE_URL}/products/${product.id}`,
      updatedProduct
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

/**
 * Create a new product
 */
export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product | null> => {
  try {
    const response = await axios.post<Product>(
      `${API_BASE_URL}/products`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
