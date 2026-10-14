import { api } from "@/lib/server-api";
import { OmitProduct } from "@/stores/cart";

export const printerService = {
    printReceipt: async (cartItems: OmitProduct[], orderCode: number) => {
        try {
            const response = await api.post("/printer/print", {
                cartItems,
                orderCode,
            });
            return response.data;
        } catch (error: any) {
            return {
                error: error.response?.data?.error || "Erro ao imprimir cupom",
                data: null,
            };
        }
    },
};
