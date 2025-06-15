const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export interface SearchParams {
  query?: string;
  cuisine?: string;
  time?: string;
}

export async function getRecipes(searchParams: SearchParams): Promise<Recipe[]> {
  const { query, cuisine, time } = searchParams;

  const params = new URLSearchParams({
    apiKey: API_KEY,
  });

  if (query) params.append("query", query);
  if (cuisine) params.append("cuisine", cuisine);
  if (time) params.append("maxReadyTime", time);

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await res.json();

    if (!data.results) return [];

    return data.results;
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
    return [];
  }
}
