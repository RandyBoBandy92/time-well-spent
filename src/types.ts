export interface TimeTransaction {
  id: string;
  description: string;
  category: string;
  duration: number; // in minutes
  date: string;
}

export interface Category {
  id: string;
  name: string;
  budgetedTime: number; // in minutes
}

export interface AppState {
  transactions: TimeTransaction[];
  categories: Category[];
}