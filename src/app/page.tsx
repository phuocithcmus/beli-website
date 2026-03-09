import { ProductGrid } from "@/components/ui/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F0F8FF]">
      {/* Playful background pattern using CSS radial-gradient dots */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #94a3b8 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 w-full overflow-x-hidden">
        <ProductGrid />
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t-8 border-blue-400 pt-16 pb-12 relative z-10 overflow-hidden mt-20">
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-5xl font-black text-white mb-6 transform -rotate-2 hover:rotate-2 transition-transform cursor-pointer">
            <span className="text-blue-400">Beli</span>
            <span className="text-pink-400">Shop!</span>
          </h2>
          <p className="text-lg font-bold text-slate-300 text-center max-w-md">
            Bringing joy, creativity, and endless playtime adventures right to your doorstep. 🎁
          </p>
          
          <div className="mt-12 w-full max-w-2xl border-t-4 border-slate-700 border-dashed mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white font-bold">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Play</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Contact Santa</a>
          </div>

          <p className="mt-4 text-sm font-bold text-slate-500">
            &copy; {new Date().getFullYear()} Beli Shop Inc. Designed for fun. built with Next.js & Tailwind.
          </p>
        </div>
      </footer>
    </main>
  );
}
