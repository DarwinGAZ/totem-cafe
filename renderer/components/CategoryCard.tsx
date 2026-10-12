type Props = {
    img: string;
    category: string;
};

export default function CategoryCard({ img, category }: Props) {
    return (
        <div className="w-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-white)] text-center shadow-[0_4px_14px_var(--color-shadow-light)] transition-transform duration-300 hover:scale-[1.02]">
            <img
                src={img}
                alt={category}
                className="h-28 w-40 rounded-t-2xl object-cover"
            ></img>
            <h3 className="px-2 py-3 text-lg font-semibold tracking-wide text-[var(--color-ink-raised)]">
                {category}
            </h3>
        </div>
    );
}
