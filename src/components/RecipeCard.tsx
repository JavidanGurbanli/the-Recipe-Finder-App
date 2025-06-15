'use client';

import Link from 'next/link';
import Image from 'next/image';

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
}

export default function RecipeCard({ id, title, image }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${id}`}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <span className="text-emerald-500 font-semibold text-sm">👀</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2 leading-tight">
          {title}
        </h2>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">✨ View Recipe</span>
        </div>
      </div>
    </Link>
  );
}
