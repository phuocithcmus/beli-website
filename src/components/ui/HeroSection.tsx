import { Star, ArrowRight, ToyBrick } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-[#E0F2FE] border-b-8 border-blue-400">
      {/* Playful background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-400 rounded-full opacity-50 blur-2xl animate-pulse delay-700" />
      <div className="absolute top-40 right-40 w-24 h-24 bg-green-400 rounded-full opacity-50 blur-2xl animate-pulse delay-1000" />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40 lg:px-8 lg:pt-48 flex flex-col items-center justify-center text-center relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-5 py-2 text-sm leading-6 text-orange-800 font-bold bg-white/60 backdrop-blur-md border-[3px] border-orange-300 shadow-[4px_4px_0px_#fbd38d] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#fbd38d] transition-all cursor-pointer">
              🎉 New Summer Toys Just Arrived!{" "}
              <a href="#collection" className="text-orange-600 underline decoration-wavy decoration-orange-400 underline-offset-4 ml-1">
                <span className="absolute inset-0" aria-hidden="true" />
                Shop Now <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          
          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl lg:text-8xl drop-shadow-md relative inline-block">
            Welcome to <span className="text-blue-600 inline-block -rotate-2 transform hover:rotate-3 transition-transform cursor-pointer">Beli</span>
            <span className="text-pink-500 inline-block rotate-3 transform hover:-rotate-2 transition-transform cursor-pointer">Shop!</span>
          </h1>
          
          <p className="mt-8 text-xl leading-8 text-slate-800 max-w-2xl mx-auto font-medium bg-white/40 p-6 rounded-3xl border-4 border-dashed border-yellow-500 shadow-sm backdrop-blur-sm">
            Discover a magical world of fun! From educational puzzles to super-fast RC cars, we have the perfect playmate for kids of all ages. Let the adventure begin! 🚀
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <a
              href="#collection"
              className="group relative flex items-center gap-3 rounded-2xl bg-pink-500 px-8 py-4 text-lg font-bold text-white shadow-[6px_6px_0px_#be185d] border-4 border-pink-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#be185d] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all"
            >
              <ToyBrick className="h-6 w-6 animate-bounce" />
              Let's Play
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </a>
            <a href="#" className="text-lg font-bold leading-6 text-blue-700 hover:text-blue-900 flex items-center gap-2 transition-colors">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
              Top Rated Toys
            </a>
          </div>
        </div>
      </div>
      
      {/* Wavy bottom decoration */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.06,155.23,124.64,226.47,109.83,283.74,97.88,321.39,56.44,321.39,56.44Z"
            className="fill-[#F0F8FF]"
          ></path>
        </svg>
      </div>
    </div>
  );
}
