const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export type RecipeDetail = {
  title: string;
  extendedIngredients: { original: string }[];
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
};

export async function getRecipeDetails(id: string): Promise<RecipeDetail | null> {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
  } catch (err) {
    console.error('Error fetching recipe details:', err);
    return null;
  }
}
