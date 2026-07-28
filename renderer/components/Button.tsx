type Props = {
    text: string;
    color?: "green" | "red";
    onClick?: () => void;
    className?: string;
};

const colorVariants = {
    green: "bg-green-500 ",
    red: "bg-red-500 ",
};

export default function Button({ text, color, onClick, className }: Props) {
    return (
        <div>
            <button
                className={`text-3xl whitespace-nowrap rounded-2xl px-20 py-4 duration-200 active:scale-95 ${
                    color
                        ? colorVariants[color]
                        : "bg-transparent text-black shadow-lg"
                } ${className || ""}`}
                onClick={onClick}
            >
                <span className={color ? "text-white" : "text-black"}>
                    {text}
                </span>
            </button>
        </div>
    );
}
