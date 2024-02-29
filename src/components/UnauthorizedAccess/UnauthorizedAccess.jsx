import Link from "next/link";

export default function UnauthorizedAccess() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#695acd] border py-4 px-5 border-1 border-red-800 gap-10">
            <div className="text-white mx-auto text-center">
                <h1 className=" font-bold notfound text-shadow cursor-pointer text-[7rem]">Oops</h1>
                <p>You cannot access this page yet. Your profile is pending verification.</p>
                <p>Await further instruction</p>
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

