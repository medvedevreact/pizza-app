import instance from "@/lib/axiosInstance";

export const fetchProducts = async (query: string): Promise<any[]> => {
  try {
    const response = await instance.get("/products", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
};
