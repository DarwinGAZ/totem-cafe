import { useState } from "react";
import { Product } from "@/types/product";
import { getImageUrl } from "@/utils/imageUrl";

type Props = {
    product: Product;
    onAdd: () => void;
    onClickCard: () => void;
};

export default function ProductCard({ product, onAdd, onClickCard }: Props) {
    const [imageFailed, setImageFailed] = useState(false);
    const imageUrl = getImageUrl(product.image);

    return (
        <div
            onClick={product.available ? onClickCard : undefined}
            className={`cursor-pointer bg-[var(--color-surface-white)] rounded-[1.5rem] p-3 border border-[rgba(var(--color-border-rgb),0.55)] flex flex-col group transition-all duration-300 h-full ${
                product.available
                    ? "shadow-[0_4px_18px_var(--color-shadow-light)] hover:-translate-y-1 hover:shadow-[0_10px_28px_var(--color-shadow-medium)] animate-slide-up"
                    : "border-[rgba(var(--color-danger-rgb),0.35)]"
            }`}
        >
            {/* Área da Imagem */}
            <div className="w-full aspect-video max-h-[13rem] bg-[var(--color-paper)] rounded-[1.15rem] flex items-center justify-center mb-4 relative overflow-hidden">
                {product.available && (
                    <div className="absolute inset-0 bg-[rgba(var(--color-black-rgb),0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none rounded-[1.15rem]"></div>
                )}

                {!product.available && (
                    <div className="absolute inset-0 bg-[rgba(var(--color-danger-rgb),0.2)] backdrop-blur-[2px] z-20 flex items-center justify-center rounded-[1.15rem]">
                        <span className="bg-[var(--color-danger)] text-white font-semibold px-6 py-2 rounded-xl text-xl uppercase tracking-widest shadow-xl border border-white/30">
                            Esgotado
                        </span>
                    </div>
                )}

                {imageUrl && !imageFailed ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        onError={() => setImageFailed(true)}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                            product.available
                                ? "group-hover:scale-110"
                                : "grayscale opacity-70"
                        }`}
                    />
                ) : (
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-16 w-16 text-[var(--color-brown)] transition-transform duration-500 ${
                            product.available
                                ? "group-hover:scale-110"
                                : "grayscale opacity-50"
                        }`}
                    >
                        <path d="M17 7c-3 3 3 4 0 7m8-7c-3 3 3 4 0 7" />
                        <path d="M10 18h23l-2.5 15h-18L10 18Z" />
                        <path d="M33 21h2a5 5 0 0 1 0 10h-4" />
                        <path d="M8 38h28" />
                    </svg>
                )}
            </div>

            <div className="flex flex-col flex-1 px-2 pb-1">
                <h3 className="text-xl font-semibold text-[var(--color-ink-raised)] leading-tight mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                </p>

                <div className="mt-auto flex justify-between items-center pt-3 border-t border-[rgba(var(--color-paper-rgb),0.9)]">
                    <span
                        className={`text-2xl font-semibold tracking-tight ${product.available ? "text-[var(--color-ink)]" : "text-[var(--color-danger)]"}`}
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
                        className={`w-12 h-12 rounded-full text-[var(--color-white)] flex items-center justify-center text-3xl shadow-sm transition-all duration-300 ${
                            product.available
                                ? "bg-[var(--color-action)] text-[var(--color-action-ink)] shadow-[0_4px_12px_rgba(59,95,71,0.24)] hover:bg-[var(--color-action-deep)] active:scale-90"
                                : "bg-[rgba(var(--color-danger-rgb),0.12)] text-[var(--color-danger)] cursor-not-allowed"
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
