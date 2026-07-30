import { useEffect, useState } from "react";

type Props = {
    message: string;
    onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 1500);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div
            className={`fixed top-10 left-1/2 transform -translate-x-1/2 bg-[var(--color-ink)] px-8 py-4 rounded-[2rem] shadow-2xl text-white font-bold text-2xl transition-all duration-300 z-[100] flex items-center gap-3 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
            }`}
        >
            <span className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-xl">
                ✓
            </span>
            {message}
        </div>
    );
}
