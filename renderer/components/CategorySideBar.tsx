import { Category } from "@/types/category";
import CafeLogo from "./CafeLogo";
import { getImageUrl } from "@/utils/imageUrl";

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
        <aside className="z-20 flex h-full w-[clamp(13rem,19vw,19rem)] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface-white)] px-5 py-6 shadow-[8px_0_32px_var(--color-shadow-light)]">
            <div className="flex flex-col items-center border-b border-[var(--color-border)] pb-6">
                <CafeLogo className="h-[4.4rem] w-56" />
                <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    Café e comida afetiva
                </p>
            </div>

            <nav className="flex-1 overflow-y-auto py-7" aria-label="Categorias">
                <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    Explore o cardápio
                </h2>
                <ul className="space-y-2">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        const imageUrl = getImageUrl(cat.image);
                        return (
                            <li key={cat.id}>
                                <button
                                    type="button"
                                    onClick={() => onSelectCategory(cat.id)}
                                    aria-pressed={isActive}
                                    className={`group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors ${
                                        isActive
                                            ? "border-[var(--color-highlight)] bg-[rgba(var(--color-highlight-rgb),0.1)] text-[var(--color-highlight-deep)] shadow-sm"
                                            : "border-transparent text-[var(--color-text-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-background)]"
                                    }`}
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-surface-white)]">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt=""
                                                className="h-full w-full object-cover"
                                                onError={(event) => {
                                                    event.currentTarget.classList.add(
                                                        "hidden",
                                                    );
                                                    event.currentTarget.nextElementSibling?.classList.remove(
                                                        "hidden",
                                                    );
                                                }}
                                            />
                                        ) : null}
                                        <span
                                            className={`font-display text-2xl font-semibold text-[var(--color-brown)] ${
                                                imageUrl ? "hidden" : ""
                                            }`}
                                        >
                                            {cat.name.charAt(0)}
                                        </span>
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-base font-semibold">
                                        {cat.name}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`h-2 w-2 rounded-full ${
                                            isActive
                                                ? "bg-[var(--color-highlight)]"
                                                : "bg-transparent group-hover:bg-[var(--color-border)]"
                                        }`}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <p className="border-t border-[var(--color-border)] pt-4 text-center text-xs text-[var(--color-text-muted)]">
                Preparado com carinho, na hora.
            </p>
        </aside>
    );
}
