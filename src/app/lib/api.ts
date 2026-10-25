
export type Product = {
    
markets: {
  market: string;
  division: string;
  min: number;
  max: number;
}[];

  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("API থেকে পণ্যের তালিকা পাওয়া যায়নি।");
  }

  return data as Product[];
}

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তথ্য লোড করা যায়নি।");
  }

  return response.json();
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
}

