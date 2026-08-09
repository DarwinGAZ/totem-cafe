import { api } from "@/lib/server-api";

export const productService = {
    getProductsByCategory: async (id: string) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            return { error: "Erro ao buscar produtos", data: null };
        }
    },
};
