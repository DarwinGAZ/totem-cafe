import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/stores/cart";
import { useTotalPrice } from "@/utils/totalPrice";
import { orderService } from "@/services/orders.service";
import { printerService } from "@/services/printer.service";

export default function Pagamento() {
    const router = useRouter();

    const [metodoSelecionado, setMetodoSelecionado] = useState<
        "pix" | "credit" | "debit" | "cash" | null
    >(null);

    const totalPrice = useTotalPrice();
    const cartItems = useCart((state) => state.cartItems);

    const handleCreateOrder = async (
        method: "pix" | "credit" | "debit" | "cash" | null,
    ) => {
        setMetodoSelecionado(method);

        const orderResponse = await orderService.createOrder({
            items: cartItems.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
            })),
            method,
        });

        const orderCode =
            orderResponse?.data?.code || orderResponse?.data?.data?.code || 0;

        if (method === "pix") {
            await printerService.printReceipt(cartItems, Number(orderCode));
            router.push(`/payment-result?status=approved&code=${orderCode}`);
            return;
        }

        router.push("/payment-result?status=refused");
    };

    return (
        <main className="paper-texture min-h-screen bg-[var(--color-background)] flex flex-col items-center pt-12 pb-0 font-ui selection:bg-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-[rgba(var(--color-paper-rgb),0.5)] to-transparent pointer-events-none"></div>

            <header className="w-full max-w-6xl px-8 flex justify-between items-center mb-12 z-10">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-ink)]">
                        Pagamento
                    </h1>
                    <p className="text-2xl text-[var(--color-text-muted)] mt-2 font-medium">
                        Como você prefere pagar?
                    </p>
                </div>

                {!metodoSelecionado ? (
                    <Link href="/cart">
                        <button className="flex items-center gap-3 text-2xl font-bold text-[var(--color-text-muted)] bg-[var(--color-white)] border border-[rgba(var(--color-border-rgb),0.5)] px-8 py-5 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all">
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
                            Voltar ao Carrinho
                        </button>
                    </Link>
                ) : (
                    <button
                        onClick={() => setMetodoSelecionado(null)}
                        className="flex items-center gap-3 text-2xl font-bold text-[var(--color-danger)] bg-[var(--color-white)] border border-[rgba(var(--color-border-rgb),0.5)] px-8 py-5 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all"
                    >
                        Cancelar Pagamento
                    </button>
                )}
            </header>

            <div className="w-full max-w-6xl flex-1 flex gap-12 px-8 pb-20 z-10">
                <div className="w-[35%] bg-[var(--color-white)] rounded-[3rem] p-10 shadow-[0_4px_20px_var(--color-shadow-light)] border border-[rgba(var(--color-border-rgb),0.4)] flex flex-col h-fit">
                    <h2 className="text-3xl font-bold text-[var(--color-ink-raised)] mb-8 border-b border-[var(--color-paper)] pb-4">
                        Resumo do Pedido
                    </h2>

                    <div className="space-y-6 flex-1 mb-10">
                        {cartItems.map((item) => {
                            return (
                                <div className="flex justify-between items-center text-xl font-medium text-[var(--color-text-muted)]">
                                    <span key={item.product.id}>
                                        {item.quantity} {item.product.name}
                                    </span>
                                    <span>{}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-[var(--color-paper)] flex flex-col gap-2">
                        <span className="text-2xl text-[var(--color-text-muted)]">
                            Total a pagar
                        </span>
                        <span className="text-6xl font-black text-[var(--color-accent)]">
                            {totalPrice}
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center bg-[var(--color-white)] rounded-[3rem] p-12 shadow-[0_10px_40px_var(--color-shadow-medium)] border border-[rgba(var(--color-border-rgb),0.5)] relative overflow-hidden">
                    {!metodoSelecionado ? (
                        <div className="animate-fade-in flex flex-col gap-6 h-full justify-center">
                            <h3 className="text-3xl font-bold text-[var(--color-ink)] mb-4 text-center">
                                Selecione no totem:
                            </h3>

                            <button
                                onClick={() => handleCreateOrder("pix")}
                                className="group flex items-center justify-between p-8 rounded-[2rem] border-2 border-[var(--color-paper)] hover:border-[var(--color-signal)] hover:bg-[rgba(var(--color-signal-rgb),0.05)] transition-all duration-300 active:scale-95"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-[rgba(var(--color-signal-rgb),0.2)] rounded-2xl flex items-center justify-center text-[var(--color-signal-deep)]">
                                        <img
                                            src="/images/pix-icon.png"
                                            alt="icone pix"
                                        />
                                    </div>
                                    <span className="text-4xl font-bold text-[var(--color-ink-raised)] group-hover:text-[var(--color-signal-deep)] transition-colors">
                                        Pix
                                    </span>
                                </div>
                                <span className="text-[var(--color-signal-deep)] font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                    Aprovação imediata →
                                </span>
                            </button>

                            <button
                                onClick={() => handleCreateOrder("debit")}
                                className="group flex items-center justify-between p-8 rounded-[2rem] border-2 border-[var(--color-paper)] hover:border-[var(--color-accent)] hover:bg-[rgba(var(--color-accent-rgb),0.05)] transition-all duration-300 active:scale-95"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                                        <img
                                            src="/images/credit-icon.png"
                                            alt="cartao icone"
                                        />
                                    </div>
                                    <span className="text-4xl font-bold text-[var(--color-ink-raised)] group-hover:text-[var(--color-accent-deep)] transition-colors">
                                        Cartão de Débito
                                    </span>
                                </div>
                            </button>

                            <button
                                onClick={() => handleCreateOrder("credit")}
                                className="group flex items-center justify-between p-8 rounded-[2rem] border-2 border-[var(--color-paper)] hover:border-[var(--color-accent)] hover:bg-[rgba(var(--color-accent-rgb),0.05)] transition-all duration-300 active:scale-95"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                                        <img
                                            src="/images/credit-icon.png"
                                            alt="cartao icone"
                                        />
                                    </div>
                                    <span className="text-4xl font-bold text-[var(--color-ink-raised)] group-hover:text-[var(--color-accent-deep)] transition-colors">
                                        Cartão de Crédito
                                    </span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className="animate-slide-up flex flex-col items-center justify-center h-full text-center">
                            {metodoSelecionado === "pix" ? (
                                <>
                                    <h3 className="text-4xl font-black text-[var(--color-ink)] mb-4">
                                        Escaneie o QR Code
                                    </h3>
                                    <p className="text-2xl text-[var(--color-text-muted)] mb-10">
                                        Abra o app do seu banco e aponte a
                                        câmera
                                    </p>
                                    <div className="w-64 h-64 bg-[var(--color-white)] border-4 border-[var(--color-signal-deep)] rounded-3xl p-4 shadow-xl flex items-center justify-center relative">
                                        <div className="absolute inset-0 border-[4px] border-[var(--color-signal)] rounded-3xl animate-pulse-ring pointer-events-none"></div>
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PagamentoBistro57"
                                            alt="QR Code"
                                            className="w-full h-full object-contain opacity-90"
                                        />
                                    </div>
                                    <p className="text-xl font-bold text-[var(--color-signal-deep)] mt-8 animate-pulse">
                                        Aguardando pagamento...
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-4xl font-black text-[var(--color-ink)] mb-4">
                                        Siga as instruções na Maquininha
                                    </h3>
                                    <p className="text-2xl text-[var(--color-text-muted)] mb-12">
                                        Insira ou aproxime seu cartão na máquina
                                        abaixo da tela
                                    </p>

                                    <div className="relative w-40 h-40 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-[rgba(var(--color-accent-rgb),0.2)] rounded-full animate-ping opacity-75"></div>
                                        <div className="w-24 h-24 bg-[var(--color-accent)] rounded-full flex items-center justify-center shadow-lg relative z-10 text-[var(--color-white)]"></div>
                                    </div>
                                    <p className="text-xl font-bold text-[var(--color-accent-deep)] mt-10 animate-pulse">
                                        Aguardando senha/aproximação...
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
