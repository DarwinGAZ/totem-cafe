type Produto = {
    id: number;
    nome: string;
    preco: string;
    desc: string;
};

type Props = {
    produto: Produto;
    onAdd: () => void;
};

export default function ProductCard({ produto, onAdd }: Props) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-white/50 flex flex-col justify-between animate-slide-up hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-[#5C4033] mb-2">
                        {produto.nome}
                    </h3>
                    <p className="text-lg text-[#7a7263] leading-tight">
                        {produto.desc}
                    </p>
                </div>
                {/* Placeholder para imagem do produto */}
                <div className="w-24 h-24 bg-[#F5EBE1] rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0 ml-4">
                    ☕
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <span className="text-3xl font-black text-[#d9a441]">
                    {produto.preco}
                </span>
                <button
                    onClick={onAdd}
                    className="bg-[#4A3B32] text-white w-14 h-14 rounded-full text-4xl flex items-center justify-center hover:bg-[#d9a441] active:scale-90 transition-all shadow-md"
                >
                    +
                </button>
            </div>
        </div>
    );
}
