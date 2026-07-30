import Button from "./Button";

type Props = {
    total: string;
    onOpenCart: () => void;
};

export default function CartFooter({ total, onOpenCart }: Props) {
    return (
        <footer className="absolute bottom-0 w-full bg-[var(--color-white)] shadow-[0_-10px_40px_var(--color-shadow-strong)] p-6 px-10 flex justify-between items-center z-20 border-t border-[var(--color-border)] rounded-tl-3xl">
            <div className="flex flex-col">
                <span className="text-xl text-[var(--color-text-muted)] font-medium">
                    Total do Pedido
                </span>
                <span className="text-4xl font-black text-[var(--color-brand)]">
                    {total}
                </span>
            </div>

            <Button text="Ver Carrinho" color="green" onClick={onOpenCart} />
        </footer>
    );
}
