export default function Loading() {
    return (
        <div
            role="status"
            aria-label="Carregando"
            className="h-12 w-12 rounded-full border-4 border-[var(--color-border)] border-r-[var(--color-accent)] border-t-[var(--color-accent)] animate-spin"
        />
    );
}
