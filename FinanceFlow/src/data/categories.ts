import { Category } from '../types/finance';

export const defaultCategories: Category[] = [
  // Income Categories
  { id: '1', name: 'Salary', type: 'income', color: '#22c55e', icon: 'Banknote' },
  { id: '2', name: 'Freelance', type: 'income', color: '#10b981', icon: 'Laptop' },
  { id: '3', name: 'Investment', type: 'income', color: '#059669', icon: 'TrendingUp' },
  { id: '4', name: 'Business', type: 'income', color: '#047857', icon: 'Building' },
  { id: '5', name: 'Other Income', type: 'income', color: '#065f46', icon: 'Plus' },

  // Expense Categories
  { id: '6', name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: 'Utensils' },
  { id: '7', name: 'Transportation', type: 'expense', color: '#dc2626', icon: 'Car' },
  { id: '8', name: 'Shopping', type: 'expense', color: '#b91c1c', icon: 'ShoppingBag' },
  { id: '9', name: 'Entertainment', type: 'expense', color: '#991b1b', icon: 'Music' },
  { id: '10', name: 'Bills & Utilities', type: 'expense', color: '#7f1d1d', icon: 'Receipt' },
  { id: '11', name: 'Healthcare', type: 'expense', color: '#f97316', icon: 'Heart' },
  { id: '12', name: 'Education', type: 'expense', color: '#ea580c', icon: 'BookOpen' },
  { id: '13', name: 'Travel', type: 'expense', color: '#c2410c', icon: 'Plane' },
  { id: '14', name: 'Rent/Mortgage', type: 'expense', color: '#9a3412', icon: 'Home' },
  { id: '15', name: 'Other Expenses', type: 'expense', color: '#7c2d12', icon: 'Minus' },
];