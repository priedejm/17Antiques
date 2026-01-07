import { v4 as uuidv4 } from "uuid";
import { CategoryItem, PeriodItem, ConditionItem } from "../types/item";

// Initial sample data
let categories: CategoryItem[] = [
  { id: uuidv4(), name: "Case goods" },
  { id: uuidv4(), name: "Tabletop" },
  { id: uuidv4(), name: "Mirrors" },
  { id: uuidv4(), name: "Art" },
  { id: uuidv4(), name: "Lighting" },
];

let periods: PeriodItem[] = [
  { id: uuidv4(), name: "Victorian" },
  { id: uuidv4(), name: "Art Deco" },
  { id: uuidv4(), name: "Edwardian" },
  { id: uuidv4(), name: "Mid-Century Modern" },
  { id: uuidv4(), name: "Georgian" },
  { id: uuidv4(), name: "Art Nouveau" },
  { id: uuidv4(), name: "Regency" },
];

let conditions: ConditionItem[] = [
  { id: uuidv4(), name: "Excellent" },
  { id: uuidv4(), name: "Very Good" },
  { id: uuidv4(), name: "Good" },
  { id: uuidv4(), name: "Fair" },
  { id: uuidv4(), name: "Poor" },
];

// Categories CRUD operations
export const getCategories = (): Promise<CategoryItem[]> => {
  return Promise.resolve([...categories]);
};

export const addCategory = (name: string): Promise<CategoryItem> => {
  const newCategory = { id: uuidv4(), name };
  categories = [...categories, newCategory];
  return Promise.resolve(newCategory);
};

export const updateCategory = (id: string, name: string): Promise<CategoryItem | undefined> => {
  const index = categories.findIndex(c => c.id === id);
  
  if (index === -1) {
    return Promise.resolve(undefined);
  }
  
  const updatedCategory = { ...categories[index], name };
  categories = [
    ...categories.slice(0, index),
    updatedCategory,
    ...categories.slice(index + 1)
  ];
  
  return Promise.resolve(updatedCategory);
};

export const deleteCategory = (id: string): Promise<boolean> => {
  const index = categories.findIndex(c => c.id === id);
  
  if (index === -1) {
    return Promise.resolve(false);
  }
  
  categories = [
    ...categories.slice(0, index),
    ...categories.slice(index + 1)
  ];
  
  return Promise.resolve(true);
};

// Periods CRUD operations
export const getPeriods = (): Promise<PeriodItem[]> => {
  return Promise.resolve([...periods]);
};

export const addPeriod = (name: string): Promise<PeriodItem> => {
  const newPeriod = { id: uuidv4(), name };
  periods = [...periods, newPeriod];
  return Promise.resolve(newPeriod);
};

export const updatePeriod = (id: string, name: string): Promise<PeriodItem | undefined> => {
  const index = periods.findIndex(p => p.id === id);
  
  if (index === -1) {
    return Promise.resolve(undefined);
  }
  
  const updatedPeriod = { ...periods[index], name };
  periods = [
    ...periods.slice(0, index),
    updatedPeriod,
    ...periods.slice(index + 1)
  ];
  
  return Promise.resolve(updatedPeriod);
};

export const deletePeriod = (id: string): Promise<boolean> => {
  const index = periods.findIndex(p => p.id === id);
  
  if (index === -1) {
    return Promise.resolve(false);
  }
  
  periods = [
    ...periods.slice(0, index),
    ...periods.slice(index + 1)
  ];
  
  return Promise.resolve(true);
};

// Conditions CRUD operations
export const getConditions = (): Promise<ConditionItem[]> => {
  return Promise.resolve([...conditions]);
};

export const addCondition = (name: string): Promise<ConditionItem> => {
  const newCondition = { id: uuidv4(), name };
  conditions = [...conditions, newCondition];
  return Promise.resolve(newCondition);
};

export const updateCondition = (id: string, name: string): Promise<ConditionItem | undefined> => {
  const index = conditions.findIndex(c => c.id === id);
  
  if (index === -1) {
    return Promise.resolve(undefined);
  }
  
  const updatedCondition = { ...conditions[index], name };
  conditions = [
    ...conditions.slice(0, index),
    updatedCondition,
    ...conditions.slice(index + 1)
  ];
  
  return Promise.resolve(updatedCondition);
};

export const deleteCondition = (id: string): Promise<boolean> => {
  const index = conditions.findIndex(c => c.id === id);
  
  if (index === -1) {
    return Promise.resolve(false);
  }
  
  conditions = [
    ...conditions.slice(0, index),
    ...conditions.slice(index + 1)
  ];
  
  return Promise.resolve(true);
};