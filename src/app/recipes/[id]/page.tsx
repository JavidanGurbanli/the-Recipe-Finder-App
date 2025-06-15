import Image from 'next/image';
import Link from 'next/link';
import { getRecipeDetails } from '../../../libs/getRecipeDetails';

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await getRecipeDetails(params.id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
        <div className="text-center bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-12 max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
            Recipe not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 leading-tight">
            {recipe.title}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="relative group">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-white/50">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-sm opacity-90 mb-1">Ready in:</div>
                <div className="text-2xl font-bold">
                  {recipe.readyInMinutes}
                </div>
                <div className="text-sm opacity-90">minutes</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-sm opacity-90 mb-1">Servings:</div>
                <div className="text-2xl font-bold">{recipe.servings}</div>
                <div className="text-sm opacity-90">people</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">🛒</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              Ingredients:
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recipe.extendedIngredients.map((ing, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300"
              >
                <div className="text-green-500 mt-1 text-sm">✓</div>
                <div className="text-gray-700 flex-1">{ing.original}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">📖</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">
              Summary:
            </h2>
          </div>
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
            style={{ lineHeight: '1.8' }}
          />
        </div>
        <div className="text-center mt-12">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
