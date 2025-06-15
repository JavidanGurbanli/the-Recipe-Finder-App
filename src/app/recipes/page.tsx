import Link from 'next/link';
import { getRecipes, SearchParams } from '../../libs/getRecipes';
import RecipeCard from '../../components/RecipeCard';

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const recipes = await getRecipes(searchParams);

  if (!recipes.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
        <div className="text-center bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-12 max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-6">
            No recipes found
          </h2>
          <p className="text-gray-600 mb-8">
            Try adjusting your search criteria
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            🔙 Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            🍽 Recipes Found
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-emerald-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 cursor-pointer"
          >
            🔍 Search Again
          </Link>
        </div>
      </div>
    </div>
  );
}
