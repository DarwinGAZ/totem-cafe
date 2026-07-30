import { Product } from "@/types/product";

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
    if (!isOpen || !product) return null;

    return (
        // Fundo escuro com desfoque (Overlay)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8">
            {/* Caixa do Modal */}
            <div className="bg-[var(--color-white)] w-full max-w-5xl rounded-[3rem] p-8 shadow-2xl flex flex-row gap-10 relative transform transition-all animate-slide-up">
                {/* Botão de Fechar Gigante */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500 shadow-sm active:scale-90 transition-all z-10"
                >
                    ✕
                </button>

                {/* Lado Esquerdo: Imagem */}
                <div className="w-1/2 aspect-square bg-gradient-to-tr from-[rgba(var(--color-paper-rgb),0.6)] to-[var(--color-white)] rounded-[2rem] flex items-center justify-center overflow-hidden">
                    {product.image ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`}
                            alt={product.name}
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
                            className="w-full bg-[var(--color-accent)] text-white text-4xl font-bold py-8 rounded-[2rem] shadow-xl active:scale-95 transition-all duration-300"
                        >
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
