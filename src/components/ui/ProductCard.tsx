import { Product } from "@/hooks/useProducts";
import { Smile, Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const [isLoved, setIsLoved] = useState(false);

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border-4 border-slate-800 shadow-[8px_8px_0px_#1e293b] transition-all duration-300 hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#1e293b] block"
    >
      
      {/* Top Banner section */}
      <div className={`relative aspect-square w-full p-6 flex items-center justify-center overflow-hidden border-b-4 border-slate-800 ${product.color}`}>
        {/* Decorative background circle */}
        <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors" />
        
        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {product.sale && (
            <div className="inline-flex items-center gap-1 rounded-xl bg-red-500 border-2 border-slate-900 border-b-4 px-3 py-1 text-sm font-black uppercase tracking-wider text-white shadow-sm transform -rotate-6 animate-pulse">
               Wow Sale!
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsLoved(!isLoved);
          }}
          className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_#1e293b] hover:bg-red-50 active:translate-y-1 active:shadow-none transition-all"
        >
          <Heart className={`h-5 w-5 ${isLoved ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-6 bg-white relative">
        {/* Category tag */}
        <span className="inline-block w-fit px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 rounded-lg border-2 border-slate-200">
          {product.category}
        </span>
        
        <h3 className="text-xl font-black text-slate-800 leading-tight mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm font-medium text-slate-500 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-400 line-through">
              {product.sale && product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : ""}
            </span>
            <span className="text-3xl font-black text-blue-600 drop-shadow-sm">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={(e) => { e.preventDefault(); /* prevent click passing to Link when adding to cart from grid */ }}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-500 border-2 border-slate-900 border-b-[4px] px-4 py-3 text-sm font-black text-white hover:bg-green-400 active:border-b-2 active:translate-y-[2px] transition-all"
          >
            <Smile className="h-5 w-5" />
            Add!
          </button>
        </div>
      </div>
    </Link>
  );
}
