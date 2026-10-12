import Link from "next/link";

export default function Home() {
    return (
        <Link href="/menu" className="block w-full min-h-screen cursor-pointer">
            <main className="paper-texture min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-8 text-[var(--color-brand)] font-ui overflow-hidden relative selection:bg-transparent">
                <div className="absolute -top-48 -left-40 h-[34rem] w-[34rem] rounded-full border border-[rgba(var(--color-accent-rgb),0.12)] pointer-events-none" />
                <div className="absolute -bottom-72 -right-48 h-[44rem] w-[44rem] rounded-full border border-[rgba(var(--color-accent-rgb),0.1)] pointer-events-none" />

                <div className="flex flex-col items-center text-center relative z-10">
                    <img
                        src="/images/bistro-57-logo.png"
                        alt="Bistrô 57 — café e comida afetiva"
                        className="w-[min(78vw,28rem)] max-h-[48vh] object-contain mix-blend-multiply"
                    />

                    <div className="space-y-3">
                        <h1 className="text-5xl font-medium tracking-tight text-[var(--color-brand)] sm:text-6xl">
                            Bem-vindo!
                        </h1>
                    </div>
                </div>

                <div className="absolute bottom-16 flex flex-col items-center gap-4 z-10 animate-pulse">
                    <span className="h-10 w-px bg-[var(--color-accent)] opacity-50" />
                    <p className="text-sm text-[var(--color-brown)] font-medium tracking-[0.24em] uppercase">
                        Toque na tela para iniciar
                    </p>
                </div>
            </main>
        </Link>
    );
}
