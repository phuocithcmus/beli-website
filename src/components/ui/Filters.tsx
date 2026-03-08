import { Search, X, Sparkles } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

const categories = [
  { name: "Building Sets", color: "bg-blue-400 border-blue-600 shadow-blue-700" },
  { name: "Electronic", color: "bg-red-400 border-red-600 shadow-red-700" },
  { name: "Wooden Toys", color: "bg-orange-400 border-orange-600 shadow-orange-700" },
  { name: "Puzzles", color: "bg-purple-400 border-purple-600 shadow-purple-700" },
  { name: "Action Figures", color: "bg-emerald-400 border-emerald-600 shadow-emerald-700" },
  { name: "Plush", color: "bg-pink-400 border-pink-600 shadow-pink-700" },
  { name: "Educational", color: "bg-yellow-400 border-yellow-600 shadow-yellow-700 text-slate-800" },
];

export function Filters() {
  const { searchQuery, setSearchQuery, category, setCategory } = useProductStore();

  return (
    <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-[2rem] border-4 border-slate-200 shadow-[8px_8px_0px_#cbd5e1]">
      {/* Magic Search Bar */}
      <div className="relative w-full md:max-w-md">
        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          Find exactly what you want!
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-2xl border-4 border-slate-300 bg-slate-50 py-3 pl-12 pr-10 text-slate-900 shadow-sm placeholder:text-slate-400 placeholder:font-medium focus:border-blue-500 focus:ring-0 sm:text-lg sm:leading-6 transition-all font-bold outline-none"
            placeholder="Search for toys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
            >
              <div className="bg-slate-200 rounded-full p-1 hover:bg-red-200 hover:text-red-600 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Chunky Category Pills */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-bold text-slate-700 mb-2">Toy Categories</label>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setCategory(null)}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl border-b-[4px] border-2 active:border-b-2 active:translate-y-[2px] transition-all ${
              category === null
                ? "bg-slate-800 border-slate-900 border-b-slate-900 text-white shadow-[0px_0px_0px_#000]"
                : "bg-white border-slate-300 border-b-slate-400 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Toys
          </button>
          {categories.map((c) => {
            const isSelected = category === c.name;
            const baseSelectedClasses = `border-2 border-b-[4px] active:border-b-2 active:translate-y-[2px] ${c.color} text-white`;
            
            // For educational which has dark text
            const selectedClasses = c.name === "Educational" 
              ? `${baseSelectedClasses} text-slate-800 font-extrabold` 
              : `${baseSelectedClasses} font-bold`;

            return (
              <button
                key={c.name}
                onClick={() => setCategory(c.name === category ? null : c.name)}
                className={`px-5 py-2.5 text-sm rounded-xl transition-all ${
                  isSelected
                    ? selectedClasses
                    : "bg-white border-2 border-slate-300 border-b-[4px] border-b-slate-400 font-bold text-slate-600 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px]"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
