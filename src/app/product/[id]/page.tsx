"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft, Rocket, MessageCircle, Send, Heart, Smile, Star, Truck, ShieldCheck, Battery, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { data: product, isLoading, error } = useProduct(unwrappedParams.id);
  
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
      <div className="min-h-screen bg-[#F0F8FF] p-10 flex flex-col items-center justify-center">
        <div className="animate-bounce">
          <Rocket className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="mt-4 text-xl font-black text-slate-800 animate-pulse">Loading toy details...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F0F8FF] p-10 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-[6px_6px_0px_#1e293b] text-center max-w-md">
          <h2 className="text-3xl font-black text-red-500 mb-2">Toy Not Found! 😱</h2>
          <p className="font-bold text-slate-600 mb-6">This toy might have rolled under the couch.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl border-4 border-slate-900 font-bold hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1e293b] transition-all">
            <ArrowLeft className="w-5 h-5" /> Back to Box
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F0F8FF] pt-8 pb-16">
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #94a3b8 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10">
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white text-slate-700 text-sm font-bold rounded-xl border-4 border-slate-800 shadow-[3px_3px_0px_#1e293b] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1e293b] active:translate-y-0 active:shadow-none transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-[2.5rem] border-4 border-slate-900 shadow-[10px_10px_0px_#1e293b] overflow-hidden">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left: Product Image */}
            <div className={`lg:col-span-5 relative flex flex-col p-6 items-center justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-slate-900 ${product.color}`}>
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white/30 rounded-full blur-2xl" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute top-4 left-4 z-20">
                {product.sale && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] font-black text-sm uppercase tracking-wider animate-pulse inline-block">
                    Super Sale!
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => setIsLoved(!isLoved)}
                className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full border-2 border-slate-900 shadow-[3px_3px_0px_#1e293b] hover:bg-red-50 transition-all"
              >
                <Heart className={`h-6 w-6 ${isLoved ? "fill-red-500 text-red-500" : "text-slate-400"} transition-all`} />
              </button>

              <div className="flex gap-2.5 mt-4 overflow-x-auto hide-scrollbar">
                {[product.image, product.image, product.image].map((img, i) => (
                  <div key={i} className="w-16 h-16 flex-shrink-0 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_#1e293b] p-1 bg-white cursor-pointer hover:-translate-y-0.5 transition-all">
                    <img src={img} alt={`Thumb ${i+1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="lg:col-span-7 flex flex-col p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <span className="px-3 py-1 font-black text-xs uppercase text-slate-600 bg-slate-100 rounded-lg border-2 border-slate-200">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-500" : "fill-slate-200 text-slate-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-500 italic">4.8 (124)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-black text-blue-600">${product.price.toFixed(2)}</span>
                {product.sale && product.originalPrice && (
                  <span className="text-lg font-bold text-slate-400 line-through decoration-red-400 decoration-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-base font-bold text-slate-600 mb-6 leading-relaxed line-clamp-3 lg:line-clamp-none">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2.5 mb-6">
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border-2 border-slate-200 text-xs font-bold">
                  <Calendar className="w-4 h-4 text-blue-500" /> Ages 4+
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 text-green-800 px-3 py-1 rounded-lg border-2 border-slate-200 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Safe Materials
                </div>
                <div className="flex items-center gap-1.5 bg-purple-50 text-purple-800 px-3 py-1 rounded-lg border-2 border-slate-200 text-xs font-bold">
                  <Battery className="w-4 h-4 text-purple-500" /> Batteries Incl.
                </div>
              </div>

              <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex items-start gap-3">
                  <div className="bg-white p-1.5 rounded-full border-2 border-blue-300">
                    <Truck className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">Free Delivery! 🚀</h4>
                    <p className="text-[10px] font-bold text-slate-500 leading-tight">Order now for arrival tomorrow afternoon.</p>
                  </div>
                </div>

                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-xl border-4 border-slate-900 border-b-[6px] hover:bg-green-400 active:border-b-[2px] active:translate-y-[4px] transition-all text-xl font-black shadow-sm"
                  onClick={() => {
                    window.location.href = product.buyLink || '#';
                    alert("🎉 Yaay! Let's go to checkout!");
                  }}
                >
                  <Smile className="w-6 h-6 animate-bounce" />
                  Buy Now!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Comment Section */}
        <div className="mt-8 bg-white rounded-[2.5rem] border-4 border-slate-900 shadow-[10px_10px_0px_#1e293b] p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6 uppercase tracking-tight">
              <MessageCircle className="w-6 h-6 text-pink-500" />
              Playful Comments
            </h3>
            
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <form onSubmit={handleAddComment} className="md:col-span-5 flex flex-col gap-3">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave an anonymous comment..."
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:shadow-[3px_3px_0px_#60a5fa] transition-all resize-none min-h-[100px]"
                  />
                  <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg text-[10px] font-black border border-orange-200 -rotate-3">
                    Ninja Mode! 🥷
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={!newComment.trim()}
                  className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg border-2 border-slate-900 border-b-4 font-black text-sm hover:bg-blue-400 active:translate-y-0.5 active:border-b-2 disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </button>
              </form>

              <div className="md:col-span-7 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                    <div className="flex items-center justify-between mb-1.5 underline decoration-slate-200 underline-offset-4">
                      <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-200 flex flex-shrink-0 items-center justify-center text-[10px]">🥷</span>
                        {comment.user}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment.date}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-600 leading-snug">{comment.text}</p>
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
