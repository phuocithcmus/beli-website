"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Rocket } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f0f8ff] border-b-4 border-slate-900 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl border-4 border-slate-900 shadow-[4px_4px_0px_#1e293b] group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_#1e293b] transition-all">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-slate-900 transform -rotate-1 group-hover:rotate-2 transition-transform">
            BELI<span className="text-pink-500">.SHOP</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border-4 border-slate-900 rounded-xl font-black text-slate-700 shadow-[4px_4px_0px_#1e293b] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1e293b] transition-all">
            <User className="h-5 w-5" />
            Join Play!
          </button>
          
          <div className="flex items-center gap-2">
            <button className="p-3 bg-white border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_#1e293b] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1e293b] transition-all text-slate-700">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-3 bg-yellow-400 border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_#1e293b] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1e293b] transition-all text-slate-900 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-black border-2 border-slate-900 rounded-full w-6 h-6 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
