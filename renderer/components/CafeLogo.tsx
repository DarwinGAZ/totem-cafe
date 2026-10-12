type Props = {
    tone?: "light" | "dark";
    className?: string;
};

export default function CafeLogo({ tone = "light", className = "" }: Props) {
    return (
        <div
            role="img"
            aria-label="Bistrô 57"
            className={`inline-flex overflow-hidden ${className}`}
        >
            <img
                src="/images/bistro-57-logo.png"
                alt=""
                className={`h-full w-full object-cover ${
                    tone === "dark" ? "invert" : ""
                }`}
            />
        </div>
    );
}
