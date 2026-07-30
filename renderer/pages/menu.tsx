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
                const categoriesRes = await categoryService.getAllCategories();
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
        async function fetchProductsByCategory(categoryId: string) {
            try {
                const productsRes =
                    await productService.getProductsByCategory(categoryId);
                const data = (productsRes.data as Product[]) || [];
                setProducts(data);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                setError("Não foi possível carregar os produtos");
            }
        }
        fetchProductsByCategory(activeCategory);
    }, [activeCategory]);

    if (loading) {
        return (
            <div className="flex flex-col h-screen w-full items-center justify-center">
                <Loading />
                <p className="text-xl text-[var(--color-text-muted)]">
                    Carregando...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-[var(--color-surface-soft)] to-[var(--color-surface-alt)] font-sans overflow-hidden selection:bg-transparent relative">
            <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            <main className="w-[75%] h-full flex flex-col relative">
                <header className="px-10 py-8 flex justify-between items-center bg-[rgba(var(--color-white-rgb),0.4)] backdrop-blur-md shadow-sm z-10">
                    <h1 className="text-5xl font-extrabold text-[var(--color-brand)] capitalize animate-fade-in">
                        {categories.find((c) => c.id === activeCategory)?.name}
                    </h1>

                    {toastMessage && (
                        <Toast
                            message={toastMessage}
                            onClose={() => setToastMessage(null)}
                        />
                    )}

                    <Link href="/home">
                        <button className="text-xl font-semibold text-[var(--color-text-muted)] bg-[var(--color-white)] border border-[var(--color-border)] px-8 py-3 rounded-full shadow-sm hover:bg-red-50 active:scale-95 transition-all">
                            ← Início
                        </button>
                    </Link>
                </header>

                <div
                    className="flex-1 overflow-y-auto p-10 pb-40 grid grid-cols-2 gap-8 auto-rows-max"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product) => (
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
                    ))}
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
