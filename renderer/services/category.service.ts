import { api } from "@/lib/server-api";

export const categoryService = {
    getAllCategories: async () => {
        try {
            const response = await api.get("/categories/");
            return response.data;
        } catch (error) {
            return { error: "Erro ao buscar categorias", data: null };
        }
    },
};
