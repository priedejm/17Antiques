export enum StoreLocation {
  SOUTH_ANTIQUES = "17 South Antiques",
  WINDERMERE = "Antiques S Windermere"
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface PeriodItem {
  id: string;
  name: string;
}

export interface ConditionItem {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  period: string;
  condition: string;
  dimensions: string;
  images: string[];
  featured: boolean;
  storeLocation: StoreLocation;
  createdAt: string;
  updatedAt: string;
}

export interface ItemFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  period: string;
  condition: string;
  dimensions: string;
  images: string[];
  featured: boolean;
  storeLocation: StoreLocation;
}