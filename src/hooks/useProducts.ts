import { useQuery } from "@tanstack/react-query";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  sale: boolean;
  category: string;
  image: string;
  color: string; // Add a fun color for each card background
  buyLink?: string;
  comments?: { id: string; user: string; text: string; date: string }[];
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Galactic Space Cruiser",
    description: "Build your own adventure with this 500-piece interlocking brick spacecraft. Features light-up engines!",
    price: 49.99,
    originalPrice: 59.99,
    sale: true,
    category: "Building Sets",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
    color: "bg-blue-100",
  },
  {
    id: "2",
    name: "Robo-Pup Companion",
    description: "A friendly robotic puppy that responds to touch, voice, and learns new tricks over time.",
    price: 89.99,
    sale: false,
    category: "Electronic",
    image: "https://images.unsplash.com/photo-1593149594411-cf2843efc3aa?auto=format&fit=crop&q=80&w=600",
    color: "bg-purple-100",
  },
  {
    id: "3",
    name: "Classic Wooden Train Set",
    description: "A timeless 40-piece wooden train set with a colorful engine, cargo cars, and winding track.",
    price: 34.50,
    originalPrice: 45.00,
    sale: true,
    category: "Wooden Toys",
    image: "https://images.unsplash.com/photo-1599623560574-39d485900c95?auto=format&fit=crop&q=80&w=600",
    color: "bg-green-100",
  },
  {
    id: "4",
    name: "Mystery Puzzle Box",
    description: "A challenging 1000-piece puzzle featuring a magical enchanted forest and hidden creatures.",
    price: 19.99,
    sale: false,
    category: "Puzzles",
    image: "https://images.unsplash.com/photo-1611077544835-ad6bba59cde7?auto=format&fit=crop&q=80&w=600",
    color: "bg-orange-100",
  },
  {
    id: "5",
    name: "Dino-Roar T-Rex",
    description: "Realistic action figure with moving joints, scary glowing eyes, and roaring sound effects.",
    price: 24.99,
    originalPrice: 29.99,
    sale: true,
    category: "Action Figures",
    image: "https://images.unsplash.com/photo-1557008657-37ab5fec8ab3?auto=format&fit=crop&q=80&w=600",
    color: "bg-emerald-100",
  },
  {
    id: "6",
    name: "Jumbo Cuddle Bear",
    description: "Giant plush teddy bear made from ultra-soft, huggable materials. Perfect for nap time!",
    price: 39.99,
    sale: false,
    category: "Plush",
    image: "https://images.unsplash.com/photo-1559404099-0e9b92ed5086?auto=format&fit=crop&q=80&w=600",
    color: "bg-pink-100",
  },
  {
    id: "7",
    name: "Magic Chemistry Kit",
    description: "Learn and play with 50 safe, exciting science experiments. Goggles included in the box.",
    price: 45.00,
    sale: false,
    category: "Educational",
    image: "https://images.unsplash.com/photo-1532092576-59ea2c0836c2?auto=format&fit=crop&q=80&w=600",
    color: "bg-yellow-100",
  },
  {
    id: "8",
    name: "Turbo RC Buggy",
    description: "High-speed remote control buggy with a rechargeable battery and durable all-terrain tires.",
    price: 54.99,
    originalPrice: 69.99,
    sale: true,
    category: "Electronic",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=600",
    color: "bg-red-100",
  }
];

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Simulate network request to show loading states
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockProducts;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      return product;
    },
    enabled: !!id,
  });
}
