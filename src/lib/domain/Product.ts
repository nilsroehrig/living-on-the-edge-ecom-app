import type { Category } from './Category';

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  brand: string;
  origin: string;
  category: Category | string | undefined;
  filename: string;
}

export interface CategorizedProduct extends Product {
  category: Category;
}
