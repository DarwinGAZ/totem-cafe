import { Category } from "@/types/category";
import CategoryCard from "./CategoryCard";

type Props = {
    categories: Category[];
    activeCategory: string;
    onSelectCategory: (id: string) => void;
};

export default function CategorySidebar({
    categories,
    activeCategory,
    onSelectCategory,
}: Props) {
    return (
        <aside className="w-[25%] bg-[var(--color-white)] shadow-2xl z-20 flex flex-col rounded-r-3xl border-r border-[var(--color-border)]">
            <div className="p-2 mb-4 pb-6 flex flex-col items-center border-b border-gray-100">
                <img
                    src="/images/cafe-logo.png"
                    alt="Logo"
                    className="w-fit h-24 object-contain"
                />
                <h2 className="text-3xl font-bold text-[var(--color-brown)] tracking-tight">
                    Cardápio
                </h2>
            </div>

            <div
                className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 flex flex-col items-center"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <div
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.id)}
                            className={`
                                cursor-pointer rounded-2xl transition-all duration-300 relative
                                ${isActive ? "scale-105" : "opacity-70 hover:scale-100 hover:opacity-100"}
                            `}
                        >
                            <div
                                className={`pointer-events-none rounded-2xl ${isActive ? "ring-4 ring-[var(--color-accent)] ring-offset-2" : ""}`}
                            >
                                <CategoryCard
                                    img={
                                        cat.image
                                            ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}${cat.image}`
                                            : "/images/cafe-logo.png"
                                    }
                                    category={cat.name}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
