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


/**
 * Format a number as currency (USD by default)
 * @param amount - The amount to format (number or string)
 * @param currency - ISO currency code (default 'USD')
 * @param locale - Locale (default 'en-US')
 */
export function formatCurrency(
  amount: number | string,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}



/**
 * Truncate a string to a given length and add ellipsis
 */
export function truncate(str: string, length: number = 50): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Generate a random string (e.g., for IDs or temporary keys)
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}