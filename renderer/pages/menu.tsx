import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CartFooter from "@/components/CartFooter";
import CategorySidebar from "@/components/CategorySideBar";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category";
import Loading from "@/components/loading";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product";
import ProductModal from "@/components/ProductModal";
import { useCart } from "@/stores/cart";
import { useRouter } from "next/router";
import Toast from "@/components/toast";
import { useTotalPrice } from "@/utils/totalPrice";

export default function Menu() {
    const router = useRouter();
    const totalPrice = useTotalPrice();

    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    const addItem = useCart((state) => state.addToCart);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesRes =
                    (await categoryService.getAllCategories()) as {
                        data: Category[];
                    };
                const data = (categoriesRes.data as Category[]) || [];
                setCategories(data);
                setActiveCategory(data[0]?.id);
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
                setError("Não foi possível carregar as categorias");
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!activeCategory) return;

        let cancelled = false;

        async function fetchProductsByCategory(categoryId: string) {
            setProducts([]);
            setProductsLoading(true);
            try {
                const productsRes = (await productService.getProductsByCategory(
                    categoryId,
                )) as { data: Product[] };
                const data = (productsRes.data as Product[]) || [];
                if (!cancelled) setProducts(data);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                if (!cancelled) {
                    setError("Não foi possível carregar os produtos");
                }
            } finally {
                if (!cancelled) setProductsLoading(false);
            }
        }

        fetchProductsByCategory(activeCategory);

        return () => {
            cancelled = true;
        };
    }, [activeCategory]);

    if (loading) {
        return (
            <div className="paper-texture flex h-screen w-full flex-col items-center justify-center gap-4 bg-[var(--color-background)]">
                <Loading />
                <p className="text-base text-[var(--color-text-muted)]">
                    Carregando...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="paper-texture flex h-screen w-full items-center justify-center bg-[var(--color-background)] p-8">
                <p
                    role="alert"
                    className="max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-white)] px-8 py-6 text-center text-lg text-[var(--color-danger)] shadow-sm"
                >
                    {error}
                </p>
            </div>
        );
    }

    const currentCategory = categories.find(
        (category) => category.id === activeCategory,
    );

    return (
        <div className="paper-texture flex h-screen w-full bg-[var(--color-background)] font-ui overflow-hidden selection:bg-transparent relative">
            <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            <main className="relative flex h-full min-w-0 flex-1 flex-col">
                <header className="z-10 flex items-center justify-between gap-6 border-b border-[var(--color-border)] bg-[rgba(var(--color-white-rgb),0.78)] px-8 py-5 backdrop-blur-md lg:px-10">
                    <div className="min-w-0">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                            Bistrô 57 <span aria-hidden="true">·</span> Nosso
                            cardápio
                        </p>
                        <h1 className="truncate text-4xl font-semibold capitalize leading-tight text-[var(--color-brand)] animate-fade-in lg:text-5xl">
                            {currentCategory?.name ?? "Cardápio"}
                        </h1>
                    </div>

                    {toastMessage && (
                        <Toast
                            message={toastMessage}
                            onClose={() => setToastMessage(null)}
                        />
                    )}

                    <Link href="/home">
                        <button className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-white)] px-5 py-3 text-sm font-semibold text-[var(--color-text-muted)] shadow-sm transition-all hover:bg-[var(--color-paper)] active:scale-95">
                            <span aria-hidden="true">←</span>
                            Início
                        </button>
                    </Link>
                </header>

                <div
                    className="grid flex-1 auto-rows-max grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-5 overflow-y-auto p-6 pb-36 lg:gap-6 lg:p-8 lg:pb-36"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {productsLoading ? (
                        <div className="col-span-full flex min-h-72 items-center justify-center">
                            <Loading />
                        </div>
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={() => {
                                    addItem(product);
                                    setToastMessage(
                                        `Adicionado ${product.name} ao carrinho!`,
                                    );
                                }}
                                onClickCard={() => {
                                    setSelectedProduct(product);
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--color-border)] bg-[rgba(var(--color-white-rgb),0.48)] px-8 text-center">
                            <span className="mb-4 text-4xl" aria-hidden="true">
                                ☕
                            </span>
                            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">
                                Em breve, novidades por aqui
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-[var(--color-text-muted)]">
                                Ainda não há produtos nesta categoria. Escolha
                                outra opção do cardápio.
                            </p>
                        </div>
                    )}
                </div>

                <CartFooter
                    total={totalPrice}
                    onOpenCart={() => router.push("/cart")}
                />
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={selectedProduct !== null}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(prod) => {
                    addItem(prod);
                    setToastMessage(
                        `Adicionado ${selectedProduct?.name} ao carrinho!`,
                    );
                }}
            />
        </div>
    );
}
