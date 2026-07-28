import Button from "./Button";

type Props = {
    total: string;
    onOpenCart: () => void;
};

export default function CartFooter({ total, onOpenCart }: Props) {
    return (
        <footer className="absolute bottom-0 w-full bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-6 px-10 flex justify-between items-center z-20 border-t border-[#E8DCC4] rounded-tl-3xl">
            <div className="flex flex-col">
                <span className="text-xl text-[#7a7263] font-medium">
                    Total do Pedido
                </span>
                <span className="text-4xl font-black text-[#4A3B32]">
                    {total}
                </span>
            </div>

            <Button text="Ver Carrinho" color="green" onClick={onOpenCart} />
        </footer>
    );
}
