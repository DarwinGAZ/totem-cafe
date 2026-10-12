import { useState } from "react";
import { Product } from "@/types/product";
import { getImageUrl } from "@/utils/imageUrl";

type Props = {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
};

export default function ProductModal({
    product,
    isOpen,
    onClose,
    onAddToCart,
}: Props) {
    const [failedImage, setFailedImage] = useState<string | null>(null);

    if (!isOpen || !product) return null;

    const imageUrl = getImageUrl(product.image);

    return (
        // Fundo escuro com desfoque (Overlay)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(var(--color-black-rgb),0.68)] backdrop-blur-sm p-8">
            {/* Caixa do Modal */}
            <div className="bg-[var(--color-surface-white)] w-full max-w-5xl rounded-[2.5rem] p-8 shadow-2xl flex flex-row gap-10 relative transform transition-all animate-slide-up border border-[var(--color-border)]">
                {/* Botão de Fechar Gigante */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-14 h-14 bg-[var(--color-paper)] rounded-full flex items-center justify-center text-2xl font-medium text-[var(--color-ink)] shadow-sm active:scale-90 transition-all z-10"
                >
                    ✕
                </button>

                {/* Lado Esquerdo: Imagem */}
                <div className="w-1/2 aspect-square bg-[var(--color-paper)] rounded-[2rem] flex items-center justify-center overflow-hidden">
                    {imageUrl && failedImage !== imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            onError={() => setFailedImage(imageUrl)}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-9xl drop-shadow-sm">☕</span>
                    )}
                </div>

                {/* Lado Direito: Informações e Botão */}
                <div className="w-1/2 flex flex-col justify-between py-6">
                    <div>
                        <h2 className="text-5xl font-black text-[var(--color-ink-raised)] mb-6 leading-tight">
                            {product.name}
                        </h2>
                        <p className="text-2xl text-[var(--color-text-muted)] leading-relaxed">
                            {product.description ||
                                "Delicioso e preparado na hora para você."}
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="text-6xl font-black text-[var(--color-ink)] mb-8">
                            {product.unitPrice.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </div>

                        <button
                            onClick={() => {
                                onAddToCart(product);
                                onClose();
                            }}
                            className="w-full bg-[var(--color-action)] text-[var(--color-action-ink)] text-3xl font-semibold py-7 rounded-[2rem] shadow-lg hover:bg-[var(--color-action-deep)] active:scale-95 transition-all duration-300"
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
