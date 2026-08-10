import { Product } from "@/types/product";

type Props = {
    product: Product;
    onAdd: () => void;
    onClickCard: () => void; // ✨ NOVA PROPRIEDADE
};

export default function ProductCard({ product, onAdd, onClickCard }: Props) {
    return (
        <div
            // ✨ Adicionado onClick e cursor-pointer na div principal
            onClick={product.available ? onClickCard : undefined}
            className={`cursor-pointer bg-[var(--color-white)] rounded-[2.5rem] p-4 border border-[rgba(var(--color-border-rgb),0.4)] flex flex-col group transition-all duration-500 h-full ${
                product.available
                    ? "shadow-[0_4px_20px_var(--color-shadow-light)] hover:shadow-[0_10px_40px_var(--color-shadow-strong)] animate-slide-up"
                    : "opacity-80"
            }`}
        >
            {/* Área da Imagem */}
            <div className="w-full aspect-square bg-gradient-to-tr from-[rgba(var(--color-paper-rgb),0.6)] to-[var(--color-white)] rounded-[2rem] flex items-center justify-center mb-6 relative overflow-hidden">
                {product.available && (
                    <div className="absolute inset-0 bg-[rgba(var(--color-black-rgb),0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none rounded-[2rem]"></div>
                )}

                {!product.available && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-[2rem]">
                        <span className="bg-red-600 text-white font-black px-6 py-2 rounded-xl text-2xl uppercase tracking-widest shadow-2xl transform -rotate-12 border-2 border-white/20">
                            Esgotado
                        </span>
                    </div>
                )}

                {product.image ? (
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                            product.available
                                ? "group-hover:scale-110"
                                : "grayscale opacity-70"
                        }`}
                    />
                ) : (
                    <span
                        className={`text-8xl drop-shadow-sm transition-transform duration-700 ${
                            product.available
                                ? "group-hover:scale-110"
                                : "grayscale opacity-50"
                        }`}
                    >
                        ☕
                    </span>
                )}
            </div>

            <div className="flex flex-col flex-1 px-3">
                <h3 className="text-2xl font-bold text-[var(--color-ink-raised)] leading-tight mb-2">
                    {product.name}
                </h3>
                <p className="text-lg text-[var(--color-text-muted)] leading-snug line-clamp-2 mb-6">
                    {product.description}
                </p>

                <div className="mt-auto flex justify-between items-center pt-5 border-t border-[rgba(var(--color-paper-rgb),0.6)]">
                    <span
                        className={`text-3xl font-black tracking-tight ${product.available ? "text-[var(--color-ink)]" : "text-red-500"}`}
                    >
                        {product.available
                            ? product.unitPrice.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                              })
                            : "Indisponível"}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Impede que abrir o modal ao clicar no botão
                            if (product.available) onAdd();
                        }}
                        disabled={!product.available}
                        className={`w-16 h-16 rounded-full text-[var(--color-white)] flex items-center justify-center text-4xl shadow-md transition-all duration-300 ${
                            product.available
                                ? "bg-[var(--color-accent)] active:scale-90"
                                : "bg-gray-300 cursor-not-allowed opacity-50"
                        }`}
                        aria-label="Adicionar ao pedido"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
