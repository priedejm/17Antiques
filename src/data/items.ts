// src/data/items.ts - Data layer for items with server integration
import { Item, ItemFormData } from "../types/item";

const API_BASE = ""; // Same domain, no prefix needed

// Get all items from server
export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_BASE}/get-items.php`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.items;
    } else {
      throw new Error(data.error || 'Failed to load items');
    }
  } catch (error) {
    console.error('Error loading items:', error);
    return [];
  }
};

// Get items by store location
export const getItemsByStore = async (storeLocation: string): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_BASE}/get-items.php?storeLocation=${encodeURIComponent(storeLocation)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.items;
    } else {
      throw new Error(data.error || 'Failed to load items');
    }
  } catch (error) {
    console.error('Error loading items by store:', error);
    return [];
  }
};

// Get featured items
export const getFeaturedItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_BASE}/get-items.php?featured=true`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.items;
    } else {
      throw new Error(data.error || 'Failed to load featured items');
    }
  } catch (error) {
    console.error('Error loading featured items:', error);
    return [];
  }
};

// Get single item by ID
export const getItemById = async (id: string): Promise<Item | null> => {
  try {
    const response = await fetch(`${API_BASE}/get-item.php?id=${encodeURIComponent(id)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.item;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error loading item:', error);
    return null;
  }
};

// Create new item
export const createItem = async (itemData: ItemFormData): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE}/create-item.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.itemId;
    } else {
      throw new Error(data.error || 'Failed to create item');
    }
  } catch (error) {
    console.error('Error creating item:', error);
    alert(`Error creating item: ${error}`);
    return null;
  }
};

// Update existing item
export const updateItem = async (id: string, itemData: ItemFormData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/update-item.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ...itemData
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return true;
    } else {
      throw new Error(data.error || 'Failed to update item');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    alert(`Error updating item: ${error}`);
    return false;
  }
};

// Delete item
export const deleteItem = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/delete-item.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return true;
    } else {
      throw new Error(data.error || 'Failed to delete item');
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    alert(`Error deleting item: ${error}`);
    return false;
  }
};