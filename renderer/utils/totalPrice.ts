import { useCart } from "@/stores/cart";

export function useTotalPrice() {
    const cartItems = useCart((state) => state.cartItems);

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.product.unitPrice * item.quantity;
    }, 0);

    return totalPrice.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
