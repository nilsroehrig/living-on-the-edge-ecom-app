import categories from '$lib/data/categories.json';
import type { Category } from '$lib/domain/Category';
import { clone } from 'ramda';

export async function getAllCategories(): Promise<Category[]> {
  return clone(categories);
}

export async function getRandomCategory(): Promise<Category> {
  const index = Math.floor(Math.random() * categories.length);
  return clone(categories[index]);
}
