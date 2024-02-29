import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#695acd] border py-4 px-5 border-1 border-red-800 gap-10 error-page">
            <div className="text-white mx-auto text-center">
                <h1 className="font-bold notfound text-shadow cursor-pointer text-[7rem]">Oops 404</h1>
                <h2>Page Not Found</h2>
                <p>Could not find requested resource</p>
            </div>
            <Link href="/main/home">
                <button type="button"
                    className={`font-bold  bg-white text-xl text-[#695acd] capitalize px-4 py-[0.55rem] rounded-lg  `}>
                    Return Home
                </button>
            </Link>
        </div>
    );
}
