import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/stores/cart";
import { useTotalPrice } from "@/utils/totalPrice";

export default function PaymentResultPage() {
    const router = useRouter();
    const cartItems = useCart((state) => state.cartItems);
    const totalPrice = useTotalPrice();

    const rawStatus = Array.isArray(router.query.status)
        ? router.query.status[0]
        : router.query.status;

    const approved = rawStatus === "approved";

    return (
        <main className="min-h-screen bg-[var(--color-background)] flex flex-col items-center pt-12 pb-0 font-sans selection:bg-transparent relative overflow-hidden">
            <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-[rgba(var(--color-paper-rgb),0.5)] to-transparent pointer-events-none"></div>

            <header className="w-full max-w-6xl px-8 flex justify-between items-center mb-12 z-10">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-black tracking-tight text-[var(--color-ink)]">
                        {approved ? "Pedido Aprovado" : "Pedido Recusado"}
                    </h1>
                    <p className="text-2xl text-[var(--color-text-muted)] mt-2 font-medium">
                        {approved
                            ? "Pagamento confirmado"
                            : "Não foi possível concluir"}
                    </p>
                </div>

                <Link href="/menu">
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
                        Voltar ao Menu
                    </button>
                </Link>
            </header>

            <div className="w-full max-w-6xl flex-1 flex gap-12 px-8 pb-20 z-10">
                <aside className="w-[35%] bg-[var(--color-white)] rounded-[3rem] p-10 shadow-[0_4px_20px_var(--color-shadow-light)] border border-[rgba(var(--color-border-rgb),0.4)] flex flex-col h-fit">
                    <h2 className="text-3xl font-bold text-[var(--color-ink-raised)] mb-8 border-b border-[var(--color-paper)] pb-4">
                        Resumo do Pedido
                    </h2>

                    <div className="space-y-6 flex-1 mb-10">
                        {cartItems.map((item) => (
                            <div
                                key={item.product.id}
                                className="flex justify-between items-center text-xl font-medium text-[var(--color-text-muted)]"
                            >
                                <span>
                                    {item.quantity} {item.product.name}
                                </span>
                                <span>
                                    {item.quantity * item.product.unitPrice}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-[var(--color-paper)] flex flex-col gap-2">
                        <span className="text-2xl text-[var(--color-text-muted)]">
                            Total a pagar
                        </span>
                        <span className="text-6xl font-black text-[var(--color-accent)]">
                            {totalPrice}
                        </span>
                    </div>
                </aside>

                <section className="flex-1 flex flex-col justify-center bg-[var(--color-white)] rounded-[3rem] p-12 shadow-[0_10px_40px_var(--color-shadow-medium)] border border-[rgba(var(--color-border-rgb),0.5)] relative overflow-hidden">
                    <div className="animate-fade-in flex flex-col items-center justify-center h-full text-center">
                        {approved ? (
                            <>
                                <div className="w-36 h-36 bg-[rgba(var(--color-signal-rgb),0.12)] rounded-full flex items-center justify-center mb-8">
                                    <svg
                                        className="w-24 h-24 text-[var(--color-signal-deep)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.2"
                                            d="M5 12l5 5L20 2"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-5xl font-black text-[var(--color-ink)] mb-4">
                                    Pedido confirmado
                                </h2>
                                <p className="text-2xl font-medium text-[var(--color-text-muted)] mb-8">
                                    Seu pedido foi aprovado e já está sendo
                                    preparado.
                                </p>
                                <div className="rounded-[2rem] border border-[rgba(var(--color-signal-rgb),0.4)] bg-[rgba(var(--color-signal-rgb),0.05)] px-8 py-6 w-full max-w-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-[var(--color-ink)]">
                                            Nº do pedido
                                        </span>
                                        <span className="text-3xl font-black text-[var(--color-signal-deep)]">
                                            #A-2048
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-5">
                                        <span className="text-2xl font-bold text-[var(--color-ink)]">
                                            Status
                                        </span>
                                        <span className="text-3xl font-black text-[var(--color-signal-deep)]">
                                            Aprovado
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-36 h-36 bg-[rgba(var(--color-danger-rgb),0.12)] rounded-full flex items-center justify-center mb-8">
                                    <svg
                                        className="w-24 h-24 text-[var(--color-danger)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-5xl font-black text-[var(--color-ink)] mb-4">
                                    Pedido recusado
                                </h2>
                                <p className="text-2xl font-medium text-[var(--color-text-muted)] mb-8">
                                    O pagamento não foi autorizado. Tente outra
                                    forma ou confira o cartão.
                                </p>
                                <div className="rounded-[2rem] border border-[rgba(var(--color-danger-rgb),0.4)] bg-[rgba(var(--color-danger-rgb),0.06)] px-8 py-6 w-full max-w-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-[var(--color-ink)]">
                                            Motivo
                                        </span>
                                        <span className="text-3xl font-black text-[var(--color-danger)]">
                                            Autorização falhou
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-5">
                                        <span className="text-2xl font-bold text-[var(--color-ink)]">
                                            Status
                                        </span>
                                        <span className="text-3xl font-black text-[var(--color-danger)]">
                                            Recusado
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-6 mt-12">
                            <Link href="/payment">
                                <button className="text-2xl font-bold text-[var(--color-text-muted)] bg-[var(--color-white)] border border-[rgba(var(--color-border-rgb),0.7)] px-10 py-4 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all">
                                    Voltar para pagamento
                                </button>
                            </Link>

                            <Link href="/menu">
                                <button className="text-2xl font-bold text-[var(--color-white)] bg-[var(--color-accent)] px-10 py-4 rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all">
                                    Novo pedido
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
