"use client";

import { useProducts } from "@/hooks/useProducts";
import { useProductStore } from "@/store/useProductStore";
import { ProductCard } from "./ProductCard";
import { Filters } from "./Filters";
import { useMemo } from "react";
import { Rocket } from "lucide-react";

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts();
  const { searchQuery, category } = useProductStore();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category ? product.category === category : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, category]);

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-bold text-2xl bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_#1e293b] inline-block">
          Oh no! Our toy shipment encountered an error! 😱
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12" id="collection">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-900 text-center mb-4 sm:text-4xl">
          The <span className="text-blue-600">Ultimate</span> Toy Box! 🎁
        </h2>
        <p className="text-lg font-bold text-slate-500 text-center max-w-2xl mx-auto mb-10">
          Find your new favorite playtime companion! Discover magical puzzles, super-fast cars, and more.
        </p>
        <Filters />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-[2rem] bg-white border-4 border-slate-200 overflow-hidden shadow-sm">
              <div className="aspect-square w-full bg-slate-100 flex items-center justify-center border-b-4 border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-200" />
              </div>
              <div className="p-6">
                <div className="h-6 w-1/3 rounded-lg bg-slate-200 mb-4" />
                <div className="h-8 w-3/4 rounded-lg bg-slate-200 mb-3" />
                <div className="h-5 w-full rounded-lg bg-slate-200 mb-2" />
                <div className="mt-6 flex justify-between items-center">
                  <div className="h-8 w-1/4 rounded-lg bg-slate-200" />
                  <div className="h-12 w-24 rounded-2xl bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-3xl border-4 border-slate-200 border-dashed m-10">
          <div className="rounded-full bg-blue-100 p-8 mb-6 border-4 border-slate-800 shadow-[6px_6px_0px_#1e293b] animate-bounce">
            <Rocket className="h-16 w-16 text-blue-600" />
          </div>
          <h3 className="text-3xl font-black text-slate-800">No toys found!</h3>
          <p className="mt-4 text-lg font-bold text-slate-500 max-w-sm">
            Looks like those toys blasted off to another galaxy! Try searching for something else.
          </p>
          <button
            onClick={() => useProductStore.getState().resetFilters()}
            className="mt-8 px-6 py-3 font-bold text-white bg-blue-500 rounded-xl border-4 border-blue-700 active:translate-y-1 transition-all shadow-[0_5px_0_#1d4ed8]"
          >
            Show All Toys
          </button>
        </div>
      )}
    </div>
  );
}
