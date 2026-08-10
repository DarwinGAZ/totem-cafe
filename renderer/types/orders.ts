export type createOrderType = {
    items: {
        productId: string;
        quantity: number;
    }[];
    method: "pix" | "debit" | "credit" | "cash" | null;
};
