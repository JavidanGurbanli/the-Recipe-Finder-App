'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [query, setQuery] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [prepTime, setPrepTime] = useState<string>('');

  const isButtonDisabled = !query && !cuisine && !prepTime;

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCuisineChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCuisine(e.target.value);
  };

  const handlePrepTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrepTime(e.target.value);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (prepTime) params.append('time', prepTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-teal-100 flex items-center justify-center px-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-6 drop-shadow-sm">
          🍽️ Recipe Finder
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="🔍 Search recipe..."
            value={query}
            onChange={handleQueryChange}
            className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl text-black shadow-lg bg-white/80 backdrop-blur-sm hover:border-emerald-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
          />

          <select
            value={cuisine}
            onChange={handleCuisineChange}
            className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl text-black shadow-lg bg-white/80 backdrop-blur-sm hover:border-emerald-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 cursor-pointer"
          >
            <option value="">🌍 Select Cuisine</option>
            <option value="chinese">🥡 Chinese</option>
            <option value="french">🥖 French</option>
            <option value="german">🥨 German</option>
            <option value="greek">🏛️ Greek</option>
            <option value="italian">🍝 Italian</option>
            <option value="japanese">🍣 Japanese</option>
            <option value="korean">🍲 Korean</option>
          </select>
          <input
            type="number"
            min={1}
            placeholder="⏱ Max prep time (minutes)"
            value={prepTime}
            onChange={handlePrepTimeChange}
            className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl text-black shadow-lg bg-white/80 backdrop-blur-sm hover:border-emerald-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
          />

          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 text-white shadow-lg transform active:scale-95 ${
              isButtonDisabled
                ? 'bg-gray-400 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
            }`}
          >
            ➡️ Next
          </button>
        </div>
      </div>
    </div>
  );
}
