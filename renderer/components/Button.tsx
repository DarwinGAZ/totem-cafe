type Props = {
    text: string;
    color?: "green" | "red";
    onClick?: () => void;
    className?: string;
};

const colorVariants = {
    green: "bg-[var(--color-action)] text-[var(--color-action-ink)] shadow-md hover:bg-[var(--color-action-deep)]",
    red: "bg-[var(--color-danger)] text-[var(--color-white)]",
};

export default function Button({ text, color, onClick, className }: Props) {
    return (
        <div>
            <button
                className={`text-2xl font-semibold whitespace-nowrap rounded-2xl px-12 py-4 duration-200 active:scale-95 focus-visible:outline-offset-4 ${
                    color
                        ? colorVariants[color]
                        : "border border-[var(--color-border)] bg-[var(--color-surface-white)] text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-paper)]"
                } ${className || ""}`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
