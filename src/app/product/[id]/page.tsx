"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft, Rocket, MessageCircle, Send, Heart, Smile, Star, Truck, ShieldCheck, Battery, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unpack the Promise based on Next.js 15 route params rules
  // Reference: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
  const unwrappedParams = use(params);
  const { data: product, isLoading, error } = useProduct(unwrappedParams.id);
  
  // Interactive client state
  const [comments, setComments] = useState<{ id: string; user: string; text: string; date: string }[]>([
    { id: "101", user: "Anonymous Parent", text: "My kid absolutely loves this! Incredible quality.", date: "2 days ago" },
    { id: "102", user: "Anonymous User", text: "So fun to play with. 10/10 recommend.", date: "1 week ago" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [isLoved, setIsLoved] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      {
        id: Date.now().toString(),
        user: "Anonymous User",
        text: newComment,
        date: "Just now",
      },
      ...comments
    ]);
    setNewComment("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0F8FF] p-10 flex flex-col items-center justify-center pt-24">
        <div className="animate-bounce">
          <Rocket className="w-16 h-16 text-blue-500" />
        </div>
        <h2 className="mt-6 text-2xl font-black text-slate-800 animate-pulse">Loading super awesome toy...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F0F8FF] p-10 flex flex-col items-center justify-center pt-24">
        <div className="bg-white p-12 rounded-[2rem] border-4 border-slate-900 shadow-[8px_8px_0px_#1e293b] text-center">
          <h2 className="text-4xl font-black text-red-500 mb-4">Toy Not Found! 😱</h2>
          <p className="text-lg font-bold text-slate-600 mb-8">This toy might have rolled under the couch.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl border-4 border-slate-900 font-bold hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1e293b] transition-all">
            <ArrowLeft className="w-5 h-5" /> Back to Box
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F0F8FF] pt-12 pb-24">
      {/* Playful background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #94a3b8 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Navigation back */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-white text-slate-700 font-bold rounded-xl border-4 border-slate-800 shadow-[4px_4px_0px_#1e293b] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#1e293b] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Beli Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Huge Product Image */}
          <div className="relative group perspective-1000">
            <div className={`relative aspect-square rounded-[3rem] border-[6px] border-slate-900 shadow-[16px_16px_0px_#1e293b] p-8 flex items-center justify-center overflow-hidden transition-transform duration-500 ${product.color}`}>
              {/* Background flare */}
              <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white/40 rounded-full blur-3xl animate-pulse" />
              
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 hover:rotate-2 transition-transform duration-500"
              />

              {/* Badges on image */}
              <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
                {product.sale && (
                  <div className="inline-block transform -rotate-12">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_#1e293b] font-black text-xl uppercase tracking-wider animate-bounce inline-block">
                      🔥 Super Sale!
                    </span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsLoved(!isLoved)}
                className="absolute top-6 right-6 z-20 p-4 bg-white rounded-full border-4 border-slate-900 shadow-[4px_4px_0px_#1e293b] hover:bg-red-50 active:translate-y-1 active:shadow-none transition-all"
              >
                <Heart className={`h-8 w-8 ${isLoved ? "fill-red-500 text-red-500 hover:scale-110" : "text-slate-400 hover:scale-110"} transition-all`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-4 hide-scrollbar">
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="w-24 h-24 flex-shrink-0 rounded-2xl border-4 border-slate-800 shadow-[4px_4px_0px_#1e293b] p-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1e293b] transition-all">
                  <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-contain filter saturate-150" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Awesome Product Info */}
          <div className="flex flex-col">
            <div className="bg-white p-1 rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_#1e293b] inline-block w-fit mb-4">
               <span className="inline-block px-4 py-2 font-black uppercase text-slate-700 bg-slate-100 rounded-xl">
                 {product.category}
               </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-4 drop-shadow-sm leading-tight">
              {product.name}
            </h1>

            {/* Reviews summary */}
            <div className="flex items-center gap-2 mb-6 cursor-pointer transform hover:scale-105 transition-transform origin-left w-fit">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < 4 ? "fill-yellow-400 text-yellow-500" : "fill-slate-200 text-slate-300"}`} />
                ))}
              </div>
              <span className="text-lg font-bold text-slate-600 underline decoration-wavy decoration-yellow-400 underline-offset-4">
                4.8 (124 reviews)
              </span>
            </div>
            
            <p className="text-xl sm:text-2xl font-bold text-slate-600 mb-8 bg-white/60 p-6 rounded-3xl border-4 border-dashed border-slate-300">
              {product.description}
            </p>

            {/* Fun Toy Features */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-xl border-2 border-slate-800 font-bold shadow-[2px_2px_0px_#1e293b]">
                <Calendar className="w-5 h-5 text-blue-600" />
                Ages 4+
              </div>
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-xl border-2 border-slate-800 font-bold shadow-[2px_2px_0px_#1e293b]">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Safe Materials
              </div>
              <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-xl border-2 border-slate-800 font-bold shadow-[2px_2px_0px_#1e293b]">
                <Battery className="w-5 h-5 text-purple-600" />
                Batteries Included
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border-4 border-slate-900 shadow-[8px_8px_0px_#1e293b] p-8 mb-12 transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  {product.sale && product.originalPrice && (
                    <span className="text-2xl font-black text-slate-400 line-through decoration-red-500 decoration-4 -rotate-2 w-fit mb-1">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-6xl font-black text-blue-600 drop-shadow-md">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="bg-blue-50 border-4 border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-4 shadow-sm">
                <div className="bg-white p-2 rounded-full border-2 border-blue-300 shadow-sm animate-pulse">
                  <Truck className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-lg">Free Magical Delivery! 🚀</h4>
                  <p className="text-sm font-bold text-slate-600">Order now and get it by tomorrow afternoon.</p>
                </div>
              </div>

              {/* The big Buy action */}
              <button 
                className="w-full flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-5 rounded-2xl border-4 border-slate-900 border-b-[8px] hover:bg-green-400 active:border-b-[4px] active:translate-y-[4px] transition-all text-2xl font-black shadow-[0_4px_0px_#1e293b] active:shadow-none"
                onClick={() => {
                  window.location.href = product.buyLink || '#';
                  alert("🎉 Yaay! Let's go to checkout!");
                }}
              >
                <Smile className="w-8 h-8 animate-bounce" />
                Buy Now!
              </button>
            </div>

            {/* Anonymous Comment Section */}
            <div className="bg-white rounded-[2rem] border-4 border-slate-200 shadow-sm p-8">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-pink-500" />
                Playful Comments
              </h3>
              
              <form onSubmit={handleAddComment} className="mb-8 flex flex-col gap-4">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave an anonymous comment..."
                    className="w-full bg-slate-50 border-4 border-slate-300 rounded-2xl p-4 font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:shadow-[4px_4px_0px_#60a5fa] transition-all resize-none min-h-[120px]"
                  />
                  <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black border-2 border-orange-300 -rotate-6">
                    Ninja Mode! 🥷
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={!newComment.trim()}
                  className="self-end flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl border-4 border-slate-900 border-b-[4px] font-black hover:bg-blue-400 active:translate-y-[2px] active:border-b-[2px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                  Post Comment
                </button>
              </form>

              {/* List of comments */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-2 absolute top-0 left-0 w-full px-5 py-2 bg-slate-100 border-b-2 border-slate-200">
                      <span className="font-black text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-200 flex flex-shrink-0 items-center justify-center text-[10px]">🥷</span>
                        {comment.user}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{comment.date}</span>
                    </div>
                    <div className="pt-10">
                      <p className="font-bold text-slate-600">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
