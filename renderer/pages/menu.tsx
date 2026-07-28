import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CartFooter from "@/components/CartFooter";
import CategorySidebar from "@/components/CategorySideBar";

// Dados mockados (você pode mover isso para uma pasta /utils ou /data no futuro)
const CATEGORIAS = [
    { id: "cafes", nome: "Cafés", img: "/images/cafe-logo.png" },
    { id: "gelados", nome: "Gelados", img: "/images/cafe-logo.png" },
    { id: "salgados", nome: "Salgados", img: "/images/cafe-logo.png" },
    { id: "doces", nome: "Doces", img: "/images/cafe-logo.png" },
];

const PRODUTOS = {
    cafes: [
        {
            id: 1,
            nome: "Espresso Duplo",
            preco: "R$ 8,90",
            desc: "Forte e encorpado",
        },
        {
            id: 2,
            nome: "Cappuccino",
            preco: "R$ 14,90",
            desc: "Com toque de canela e cacau",
        },
    ],
    gelados: [
        {
            id: 5,
            nome: "Iced Latte",
            preco: "R$ 15,90",
            desc: "Café gelado com leite",
        },
    ],
    salgados: [
        {
            id: 7,
            nome: "Croissant",
            preco: "R$ 11,90",
            desc: "Massa folhada amanteigada",
        },
        {
            id: 8,
            nome: "Pão de Queijo",
            preco: "R$ 7,90",
            desc: "Porção com 5 unidades",
        },
    ],
    doces: [
        {
            id: 10,
            nome: "Cheesecake",
            preco: "R$ 18,90",
            desc: "Com calda de frutas vermelhas",
        },
    ],
};

export default function Menu() {
    const [categoriaAtiva, setCategoriaAtiva] = useState(CATEGORIAS[0].id);
    const produtosExibidos =
        PRODUTOS[categoriaAtiva as keyof typeof PRODUTOS] || [];

    const handleAdicionarProduto = (nome: string) => {
        // Aqui vai a lógica futura do seu carrinho
        console.log(`Adicionado: ${nome}`);
    };

    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-[#FDF8F5] to-[#EAE0D5] font-sans overflow-hidden selection:bg-transparent">
            {/* Sidebar Modularizada */}
            <CategorySidebar
                categorias={CATEGORIAS}
                categoriaAtiva={categoriaAtiva}
                onSelectCategoria={setCategoriaAtiva}
            />

            {/* Área Principal */}
            <main className="w-[70%] h-full flex flex-col relative">
                <header className="px-10 py-8 flex justify-between items-center bg-white/40 backdrop-blur-md shadow-sm z-10">
                    <h1 className="text-5xl font-extrabold text-[#4A3B32] capitalize animate-fade-in">
                        {CATEGORIAS.find((c) => c.id === categoriaAtiva)?.nome}
                    </h1>

                    <Link href="/home">
                        <button className="text-xl font-semibold text-[#7a7263] bg-white border border-[#E8DCC4] px-8 py-3 rounded-full shadow-sm hover:bg-red-50 active:scale-95 transition-all">
                            ← Início
                        </button>
                    </Link>
                </header>

                {/* Grade de Produtos */}
                <div
                    className="flex-1 overflow-y-auto p-10 pb-40"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <div className="grid grid-cols-2 gap-8">
                        {produtosExibidos.map((produto) => (
                            <ProductCard
                                key={produto.id}
                                produto={produto}
                                onAdd={() =>
                                    handleAdicionarProduto(produto.nome)
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Footer Modularizado */}
                <CartFooter
                    total="R$ 0,00"
                    onOpenCart={() => (window.location.href = "/cart")}
                />
            </main>
        </div>
    );
}
