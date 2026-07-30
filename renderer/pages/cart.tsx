import Link from "next/link";
import Button from "../components/Button";
import { useCart } from "@/stores/cart";

export default function Cart() {
    const itens = useCart((state) => state.cartItems);
    const addItem = useCart((state) => state.addToCart);
    const removeItem = useCart((state) => state.removeFromCart);
    const totalPrice = useCart((state) =>
        state.cartItems.reduce((total, item) => {
            return total + item.product.unitPrice * item.quantity;
        }, 0),
    );

    const formatarPreco = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <main className="min-h-screen bg-[var(--color-background)] flex flex-col items-center pt-12 pb-0 font-sans selection:bg-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-[rgba(var(--color-paper-rgb),0.4)] to-transparent pointer-events-none"></div>

            <header className="w-full max-w-6xl px-8 flex justify-between items-center mb-8 z-10">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-black tracking-tight text-[var(--color-ink)]">
                        Revise seu Pedido
                    </h1>
                    <p className="text-2xl text-[var(--color-text-muted)] mt-2 font-medium">
                        Verifique os itens antes de pagar
                    </p>
                </div>
                <Link href="/menu">
                    <button className="flex items-center gap-3 text-2xl font-bold text-[var(--color-text-muted)] bg-[var(--color-white)] border border-[rgba(var(--color-border-rgb),0.5)] px-8 py-5 rounded-full shadow-[0_8px_30px_var(--color-shadow-outline)] hover:shadow-md active:scale-95 transition-all">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            ></path>
                        </svg>
                        Voltar
                    </button>
                </Link>
            </header>

            <div className="w-full max-w-6xl flex-1 overflow-y-auto px-8 pb-48 z-10 no-scrollbar space-y-4">
                {itens.length === 0 ? (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-40 mt-10">
                        <svg
                            className="w-32 h-32 mb-6 text-[var(--color-text-muted)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            ></path>
                        </svg>
                        <h2 className="text-4xl font-bold text-[var(--color-ink)]">
                            Sua bandeja está vazia
                        </h2>
                        <p className="text-2xl mt-2">
                            Toque em "Voltar" para escolher algo gostoso.
                        </p>
                    </div>
                ) : (
                    itens.map((item) => (
                        <div
                            key={item.product.id}
                            className="group flex items-center bg-[var(--color-white)] p-6 rounded-[2rem] shadow-[0_4px_20px_var(--color-shadow-light)] border border-[rgba(var(--color-border-rgb),0.3)] transition-all hover:shadow-[0_8px_30px_var(--color-shadow-medium)]"
                        >
                            <div className="w-32 h-32 bg-gradient-to-tr from-[rgba(var(--color-paper-rgb),0.5)] to-[var(--color-white)] rounded-3xl flex items-center justify-center text-6xl shadow-inner border border-[rgba(var(--color-white-rgb),0.6)]">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.product.image}`}
                                    alt={item.product.name}
                                    className="h-full w-full object-cover rounded-3xl"
                                />
                            </div>

                            <div className="flex-1 ml-8">
                                <h3 className="text-3xl font-bold text-[var(--color-ink-raised)]">
                                    {item.product.name}
                                </h3>
                                <p className="text-xl text-[var(--color-text-muted)] mt-2 font-medium">
                                    {item.product.description}
                                </p>
                                <p className="text-xl text-[var(--color-paper-dim)] mt-1 font-semibold">
                                    {formatarPreco(item.product.unitPrice)} / un
                                </p>
                            </div>

                            <div className="flex flex-col items-end justify-center gap-6 mr-4">
                                <span className="text-4xl font-black text-[var(--color-ink)]">
                                    {formatarPreco(
                                        item.product.unitPrice * item.quantity,
                                    )}
                                </span>

                                <div className="flex items-center bg-[rgba(var(--color-paper-rgb),0.4)] rounded-full p-1.5 border border-[rgba(var(--color-border-rgb),0.5)]">
                                    <button
                                        onClick={() =>
                                            removeItem(item.product.id)
                                        }
                                        className="w-14 h-14 rounded-full bg-[var(--color-white)] text-[var(--color-ink)] shadow-sm flex items-center justify-center text-4xl font-light active:scale-90 transition-transform"
                                    >
                                        −
                                    </button>
                                    <span className="w-16 text-center text-3xl font-bold text-[var(--color-ink-raised)]">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => addItem(item.product)}
                                        className="w-14 h-14 rounded-full bg-[var(--color-accent)] text-[var(--color-white)] shadow-md flex items-center justify-center text-4xl font-light active:scale-90 transition-transform"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="absolute bottom-0 w-full bg-[var(--color-white)] rounded-t-[3rem] shadow-[0_-15px_40px_var(--color-shadow-medium)] border-t border-[rgba(var(--color-paper-rgb),0.5)] px-12 py-10 z-20 flex justify-center">
                <div className="w-full max-w-6xl flex justify-between items-end">
                    <div className="flex flex-col w-[35%] gap-3">
                        <div className="flex flex-col justify-between text-4xl font-black text-[var(--color-ink)] pt-2">
                            <span>Total:</span>
                            <span className="text-[var(--color-accent)]">
                                {formatarPreco(totalPrice)}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <Link href="/menu">
                            <Button text="Adicionar Mais" onClick={() => {}} />
                        </Link>

                        <Link href="/payment">
                            <Button
                                text="Ir para Pagamento"
                                color="green"
                                onClick={() => {}}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
