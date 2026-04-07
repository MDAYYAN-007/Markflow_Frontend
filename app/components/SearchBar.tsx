import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-[#232323] px-6 py-4 border-b border-[#515151]">
      <input
        placeholder="Search anything..."
        className="w-138.75 rounded-lg bg-[#202020] border border-[#2A2A2A] px-5 py-2.5 text-sm
            focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={() => router.push("/add-bookmark")}
        className="rounded-lg bg-white text-black px-5 py-3 font-medium cursor-pointer hover:bg-gray-200 transition"
      >
        + New Bookmark
      </button>
    </div>
  );
};

export default SearchBar;
