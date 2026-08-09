import { api } from "@/lib/server-api";
import { createOrderType } from "@/types/orders";

export const orderService = {
    createOrder: async (data: createOrderType) => {
        try {
            const response = await api.post(`/orders/`, data);
            return response.data;
        } catch (error) {
            return { error: "Erro ao criar pedido", data: null };
        }
    },
};
