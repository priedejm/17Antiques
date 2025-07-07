import { Item, StoreLocation } from "../types/item";
import { v4 as uuidv4 } from "uuid";

// Sample data for demonstration
export const items: Item[] = [
  {
    id: uuidv4(),
    name: "Victorian Mahogany Sideboard",
    description: "Exquisite Victorian mahogany sideboard with original brass hardware. Features three drawers and two cabinet doors with intricate carvings.",
    price: 2450,
    category: "Furniture",
    period: "Victorian",
    condition: "Good",
    dimensions: "72\"W x 22\"D x 36\"H",
    images: [
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=sideboard1`,
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=sideboard2`
    ],
    featured: true,
    storeLocation: StoreLocation.SOUTH_ANTIQUES,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Art Deco Table Lamp",
    description: "Stunning Art Deco table lamp with original glass shade. Features a bronze base with geometric patterns typical of the period.",
    price: 850,
    category: "Lighting",
    period: "Art Deco",
    condition: "Excellent",
    dimensions: "14\"W x 14\"D x 24\"H",
    images: [
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=lamp1`,
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=lamp2`
    ],
    featured: false,
    storeLocation: StoreLocation.WINDERMERE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Edwardian Silver Tea Set",
    description: "Complete Edwardian silver-plated tea set including teapot, creamer, sugar bowl, and tray. Ornate floral design with excellent patina.",
    price: 1200,
    category: "Silver",
    period: "Edwardian",
    condition: "Very Good",
    dimensions: "Tray: 24\"W x 16\"D",
    images: [
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=teaset1`,
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=teaset2`
    ],
    featured: true,
    storeLocation: StoreLocation.SOUTH_ANTIQUES,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Mid-Century Modern Armchair",
    description: "Iconic mid-century modern armchair with original upholstery. Solid teak frame with clean lines and excellent craftsmanship.",
    price: 950,
    category: "Furniture",
    period: "Mid-Century Modern",
    condition: "Good",
    dimensions: "30\"W x 32\"D x 34\"H",
    images: [
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=armchair1`,
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=armchair2`
    ],
    featured: false,
    storeLocation: StoreLocation.WINDERMERE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Georgian Mahogany Chest of Drawers",
    description: "Elegant Georgian mahogany chest featuring five drawers with original brass pulls. Excellent condition with beautiful patina.",
    price: 3200,
    category: "Furniture",
    period: "Georgian",
    condition: "Excellent",
    dimensions: "36\"W x 20\"D x 48\"H",
    images: [
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=chest1`,
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=chest2`
    ],
    featured: true,
    storeLocation: StoreLocation.SOUTH_ANTIQUES,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Art Nouveau Porcelain Vase",
    description: "Beautiful Art Nouveau porcelain vase with floral motifs and flowing lines. Signed by the artist on the bottom.",
    price: 580,
    category: "Ceramics",
    period: "Art Nouveau",
    condition: "Very Good",
    dimensions: "8\"W x 8\"D x 12\"H",
    images: [
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=vase1`,
      `https://img.heroui.chat/image/furniture?w=800&h=600&u=vase2`
    ],
    featured: false,
    storeLocation: StoreLocation.WINDERMERE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock API functions
let itemsData = [...items];

export const getItems = (): Promise<Item[]> => {
  return Promise.resolve([...itemsData]);
};

export const getItemById = (id: string): Promise<Item | undefined> => {
  const item = itemsData.find(item => item.id === id);
  return Promise.resolve(item);
};

export const getFeaturedItems = (): Promise<Item[]> => {
  return Promise.resolve(itemsData.filter(item => item.featured));
};

export const getItemsByStore = (storeLocation: StoreLocation): Promise<Item[]> => {
  return Promise.resolve(itemsData.filter(item => item.storeLocation === storeLocation));
};

export const createItem = (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> => {
  const newItem: Item = {
    ...item,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  itemsData = [...itemsData, newItem];
  return Promise.resolve(newItem);
};

export const updateItem = (id: string, item: Partial<Item>): Promise<Item | undefined> => {
  const index = itemsData.findIndex(i => i.id === id);
  
  if (index === -1) {
    return Promise.resolve(undefined);
  }
  
  const updatedItem: Item = {
    ...itemsData[index],
    ...item,
    updatedAt: new Date().toISOString()
  };
  
  itemsData = [
    ...itemsData.slice(0, index),
    updatedItem,
    ...itemsData.slice(index + 1)
  ];
  
  return Promise.resolve(updatedItem);
};

export const deleteItem = (id: string): Promise<boolean> => {
  const index = itemsData.findIndex(i => i.id === id);
  
  if (index === -1) {
    return Promise.resolve(false);
  }
  
  itemsData = [
    ...itemsData.slice(0, index),
    ...itemsData.slice(index + 1)
  ];
  
  return Promise.resolve(true);
};
