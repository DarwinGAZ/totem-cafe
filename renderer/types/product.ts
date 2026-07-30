export type Product = {
    id: string;
    name: string;
    description: string;
    available: boolean;
    unitPrice: number;
    image: string;
    categoryId: string;
    createdAt?: string;
    updatedAt?: string;
};
