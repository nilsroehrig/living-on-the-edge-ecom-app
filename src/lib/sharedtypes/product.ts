import type { Category } from './category';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  origin: string;
  category: Category | undefined;
  filename: string;
}

export interface CategorizedProduct extends Product {
  category: Category;
}
