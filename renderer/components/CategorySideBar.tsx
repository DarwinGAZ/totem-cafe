import CategoryCard from "./CategoryCard";

type Categoria = {
    id: string;
    nome: string;
    img: string;
};

type Props = {
    categorias: Categoria[];
    categoriaAtiva: string;
    onSelectCategoria: (id: string) => void;
};

export default function CategorySidebar({
    categorias,
    categoriaAtiva,
    onSelectCategoria,
}: Props) {
    return (
        <aside className="w-[30%] bg-white shadow-2xl z-20 flex flex-col rounded-r-3xl border-r border-[#E8DCC4]">
            <div className="p-2 mb-4 pb-6 flex flex-col items-center border-b border-gray-100">
                <img
                    src="/images/cafe-logo.png"
                    alt="Logo"
                    className="w-fit h-24 object-contain"
                />
                <h2 className="text-3xl font-bold text-[#5C4033] tracking-tight">
                    Cardápio
                </h2>
            </div>

            <div
                className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 flex flex-col items-center"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {categorias.map((cat) => {
                    const isActive = categoriaAtiva === cat.id;
                    return (
                        <div
                            key={cat.id}
                            onClick={() => onSelectCategoria(cat.id)}
                            className={`
                                cursor-pointer rounded-2xl transition-all duration-300 relative
                                ${isActive ? "scale-105" : "opacity-70 hover:scale-100 hover:opacity-100"}
                            `}
                        >
                            <div
                                className={`pointer-events-none rounded-2xl ${isActive ? "ring-4 ring-[#d9a441] ring-offset-2" : ""}`}
                            >
                                <CategoryCard
                                    img={cat.img}
                                    category={cat.nome}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
