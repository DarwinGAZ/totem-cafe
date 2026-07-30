import { Product } from "@/types/product";
import { create } from "zustand";

export type OmitProduct = {
    product: Product;
    quantity: number;
};

type cartStore = {
    cartItems: OmitProduct[];
    addToCart: (item: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
};

export const useCart = create<cartStore>((set) => ({
    cartItems: [],

    addToCart: (item) =>
        set((state) => {
            const itemExiste = state.cartItems.find(
                (cartItem) => cartItem.product.id === item.id,
            );

            if (itemExiste) {
                return {
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.product.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem,
                    ),
                };
            }

            return {
                cartItems: [...state.cartItems, { product: item, quantity: 1 }],
            };
        }),

    removeFromCart: (productId) =>
        set((state) => {
            const itemExiste = state.cartItems.find(
                (cartItem) => cartItem.product.id === productId,
            );

            if (!itemExiste) return { cartItems: state.cartItems };

            if (itemExiste.quantity === 1) {
                return {
                    cartItems: state.cartItems.filter(
                        (cartItem) => cartItem.product.id !== productId,
                    ),
                };
            }

            return {
                cartItems: state.cartItems.map((cartItem) =>
                    cartItem.product.id === productId
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem,
                ),
            };
        }),

    clearCart: () => set({ cartItems: [] }),
}));
