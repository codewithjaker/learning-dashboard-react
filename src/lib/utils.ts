import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Category } from '../types/category.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}


export function buildCategoryTree(categories: Category[]): Category[] {
  const map = new Map<number, Category>();
  const roots: Category[] = [];

  // Create map of all categories
  categories.forEach(category => {
    map.set(category.id, { ...category, children: [] });
  });

  // Build tree
  categories.forEach(category => {
    const node = map.get(category.id)!;
    if (category.parentId && map.has(category.parentId)) {
      const parent = map.get(category.parentId)!;
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}