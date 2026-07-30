import Link from "next/link";

export default function Home() {
    return (
        <Link href="/menu" className="block w-full min-h-screen cursor-pointer">
            <main className="min-h-screen bg-gradient-to-br from-[var(--color-surface-soft)] to-[var(--color-surface-alt)] flex flex-col items-center justify-center p-8 text-[var(--color-brand)] font-sans overflow-hidden relative selection:bg-transparent">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--color-surface-glow)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[var(--color-surface-warm)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

                <div className="flex flex-col items-center text-center relative z-10 space-y-10 mt-[-10vh]">
                    <div className="w-48 h-48 bg-[rgba(var(--color-white-rgb),0.8)] backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_8px_40px_var(--color-shadow-brand)] border border-[rgba(var(--color-white-rgb),0.6)] p-8">
                        <img
                            src="/images/cafe-logo.png"
                            alt="Logo Aroma Café"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-6xl font-black tracking-tighter text-[var(--color-brand)] drop-shadow-sm mb-4">
                            AROMA CAFÉ
                        </h1>
                        <h2 className="text-3xl font-light text-[var(--color-brown)]">
                            Seja Bem-vindo
                        </h2>
                    </div>
                </div>

                <div className="absolute bottom-24 flex flex-col items-center gap-4 z-10 animate-pulse">
                    <p className="text-2xl text-[var(--color-brown)] font-bold tracking-widest uppercase mt-2 drop-shadow-sm">
                        Toque na tela para iniciar
                    </p>
                </div>
            </main>
        </Link>
    );
}
