import Button from "./Button";

type Props = {
    total: string;
    onOpenCart: () => void;
};

export default function CartFooter({ total, onOpenCart }: Props) {
    return (
        <footer className="absolute bottom-0 z-20 flex w-full items-center justify-between border-t border-[var(--color-border)] bg-[rgba(var(--color-white-rgb),0.96)] px-8 py-4 shadow-[0_-8px_28px_var(--color-shadow-medium)] backdrop-blur-md lg:px-10">
            <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    Total do Pedido
                </span>
                <span className="text-3xl font-semibold leading-tight text-[var(--color-brand)]">
                    {total}
                </span>
            </div>

            <Button
                text="Ver carrinho"
                color="green"
                onClick={onOpenCart}
                className="rounded-full px-8 py-3 text-base"
            />
        </footer>
    );
}
