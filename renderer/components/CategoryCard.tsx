type Props = {
    img: string;
    category: string;
};

export default function CategoryCard({ img, category }: Props) {
    return (
        <div className="border-1 border- text-center w-fit rounded-2xl shadow-lg flex-col justify-center items-center transition-transform hover:scale-110 duration-300">
            <img
                src={img}
                alt={category}
                className="w-50 h-auto rounded-t-2xl"
            ></img>
            <h1 className="text-3xl pb-3">{category}</h1>
        </div>
    );
}
