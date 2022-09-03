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

export interface ProductWithCategoryId extends Product {
  category: string;
}

export interface ProductWithCategory extends Product {
  category: Category;
}
