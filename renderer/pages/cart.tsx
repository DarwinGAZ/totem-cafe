import { useState } from "react";
import Link from "next/link";
import Button from "../components/Button";

const ITENS_INICIAIS = [
    {
        id: 1,
        nome: "Cappuccino",
        preco: 14.9,
        qtde: 2,
        icone: "☕",
        desc: "Com toque de canela",
    },
    {
        id: 7,
        nome: "Croissant Tradicional",
        preco: 11.9,
        qtde: 1,
        icone: "🥐",
        desc: "Massa folhada amanteigada",
    },
    {
        id: 10,
        nome: "Cheesecake",
        preco: 18.9,
        qtde: 1,
        icone: "🍰",
        desc: "Calda de frutas vermelhas",
    },
];

export default function Carrinho() {
    const [itens, setItens] = useState(ITENS_INICIAIS);

    const formatarPreco = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const atualizarQtde = (id: number, delta: number) => {
        setItens((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const novaQtde = item.qtde + delta;
                        return { ...item, qtde: novaQtde > 0 ? novaQtde : 0 };
                    }
                    return item;
                })
                .filter((item) => item.qtde > 0),
        );
    };

    const subtotal = itens.reduce(
        (acc, item) => acc + item.preco * item.qtde,
        0,
    );
    // Exemplo de taxa (opcional, só para deixar o layout mais realista)
    const taxaServico = 0;
    const total = subtotal + taxaServico;

    return (
        <main className="min-h-screen bg-[#Fdfbf7] flex flex-col items-center pt-12 pb-0 font-sans selection:bg-transparent relative overflow-hidden">
            {/* Decoração de fundo sutil */}
            <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-[#f3ecdc]/40 to-transparent pointer-events-none"></div>

            {/* Header Flutuante */}
            <header className="w-full max-w-6xl px-8 flex justify-between items-center mb-8 z-10">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-black tracking-tight text-[#17130f]">
                        Revise seu Pedido
                    </h1>
                    <p className="text-2xl text-[#7a7263] mt-2 font-medium">
                        Verifique os itens antes de pagar
                    </p>
                </div>
                <Link href="/menu">
                    <button className="flex items-center gap-3 text-2xl font-bold text-[#7a7263] bg-white border border-[#E8DCC4]/50 px-8 py-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md active:scale-95 transition-all">
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

            {/* Lista de Itens */}
            <div className="w-full max-w-6xl flex-1 overflow-y-auto px-8 pb-48 z-10 no-scrollbar space-y-4">
                {itens.length === 0 ? (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-center opacity-40 mt-10">
                        <svg
                            className="w-32 h-32 mb-6 text-[#7a7263]"
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
                        <h2 className="text-4xl font-bold text-[#17130f]">
                            Sua bandeja está vazia
                        </h2>
                        <p className="text-2xl mt-2">
                            Toque em "Voltar" para escolher algo gostoso.
                        </p>
                    </div>
                ) : (
                    itens.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#E8DCC4]/30 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                        >
                            {/* Imagem do Produto (com fundo estruturado, não apenas emoji jogado) */}
                            <div className="w-32 h-32 bg-gradient-to-tr from-[#f3ecdc]/50 to-white rounded-3xl flex items-center justify-center text-6xl shadow-inner border border-white/60">
                                {item.icone}
                            </div>

                            {/* Detalhes (Nome e Preço Unitário) */}
                            <div className="flex-1 ml-8">
                                <h3 className="text-3xl font-bold text-[#211b15]">
                                    {item.nome}
                                </h3>
                                <p className="text-xl text-[#7a7263] mt-2 font-medium">
                                    {item.desc}
                                </p>
                                <p className="text-xl text-[#b9ae99] mt-1 font-semibold">
                                    {formatarPreco(item.preco)} / un
                                </p>
                            </div>

                            {/* Controle de Quantidade e Subtotal */}
                            <div className="flex flex-col items-end justify-center gap-6 mr-4">
                                <span className="text-4xl font-black text-[#17130f]">
                                    {formatarPreco(item.preco * item.qtde)}
                                </span>

                                {/* Stepper Estilo App (Unificado) */}
                                <div className="flex items-center bg-[#f3ecdc]/40 rounded-full p-1.5 border border-[#E8DCC4]/50">
                                    <button
                                        onClick={() =>
                                            atualizarQtde(item.id, -1)
                                        }
                                        className="w-14 h-14 rounded-full bg-white text-[#17130f] shadow-sm flex items-center justify-center text-4xl font-light active:scale-90 transition-transform"
                                    >
                                        −
                                    </button>
                                    <span className="w-16 text-center text-3xl font-bold text-[#211b15]">
                                        {item.qtde}
                                    </span>
                                    <button
                                        onClick={() =>
                                            atualizarQtde(item.id, 1)
                                        }
                                        className="w-14 h-14 rounded-full bg-[#d9a441] text-white shadow-md flex items-center justify-center text-4xl font-light active:scale-90 transition-transform"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Rodapé Flutuante (Checkout) */}
            <div className="absolute bottom-0 w-full bg-white rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] border-t border-[#f3ecdc]/50 px-12 py-10 z-20 flex justify-center">
                <div className="w-full max-w-6xl flex justify-between items-end">
                    {/* Resumo Estilo Recibo */}
                    <div className="flex flex-col w-[35%] gap-3">
                        <div className="flex justify-between text-2xl font-medium text-[#7a7263]">
                            <span>Subtotal</span>
                            <span>{formatarPreco(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-medium text-[#b9ae99] pb-4 border-b border-[#f3ecdc]">
                            <span>Taxas</span>
                            <span>{formatarPreco(taxaServico)}</span>
                        </div>
                        <div className="flex justify-between text-4xl font-black text-[#17130f] pt-2">
                            <span>Total</span>
                            <span className="text-[#d9a441]">
                                {formatarPreco(total)}
                            </span>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-6">
                        <Link href="/menu">
                            {/* Usa a versão transparente (default) do seu componente */}
                            <Button text="Adicionar Mais" onClick={() => {}} />
                        </Link>

                        <Link href="/pagamento">
                            {/* Usa a versão verde do seu componente */}
                            <Button
                                text="Ir para Pagamento"
                                color="green"
                                onClick={() => {}}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Estilo para esconder barra de rolagem */}
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
