import Link from "next/link";

export default function Home() {
    return (
        /* O Link envolve toda a aplicação. Substitua "/pedido" pela sua rota real */
        <Link href="/menu" className="block w-full min-h-screen cursor-pointer">
            <main className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#EAE0D5] flex flex-col items-center justify-center p-8 text-[#4A3B32] font-sans overflow-hidden relative selection:bg-transparent">
                {/* Elementos decorativos de fundo */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#F5EBE1] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#E8DCC4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

                {/* Conteúdo Central */}
                <div className="flex flex-col items-center text-center relative z-10 space-y-10 mt-[-10vh]">
                    {/* Logo */}
                    <div className="w-48 h-48 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_8px_40px_rgb(92,64,51,0.1)] border border-white/60 p-8">
                        <img
                            src="/images/cafe-logo.png"
                            alt="Logo Aroma Café"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Textos */}
                    <div>
                        <h1 className="text-6xl font-black tracking-tighter text-[#4A3B32] drop-shadow-sm mb-4">
                            AROMA CAFÉ
                        </h1>
                        <h2 className="text-3xl font-light text-[#5C4033]">
                            Seja Bem-vindo
                        </h2>
                    </div>
                </div>

                <div className="absolute bottom-24 flex flex-col items-center gap-4 z-10 animate-pulse">
                    <p className="text-2xl text-[#5C4033] font-bold tracking-widest uppercase mt-2 drop-shadow-sm">
                        Toque na tela para iniciar
                    </p>
                </div>
            </main>
        </Link>
    );
}
