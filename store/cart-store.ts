/**
 * Shopping Cart Store
 *
 * This file implements the shopping cart state management using Zustand.
 * It handles adding, removing, and modifying cart items with support for
 * customizations (toppings, sides, etc.) and proper quantity management.
 */

import { CartCustomization, CartStore } from "@/type";
import { create } from "zustand";

/**
 * Utility function to compare two arrays of customizations for equality
 * This is critical for identifying identical cart items with the same customizations
 *
 * @param a - First array of customizations
 * @param b - Second array of customizations
 * @returns true if both arrays contain the same customizations (by ID)
 */
function areCustomizationsEqual(
  a: CartCustomization[] = [],
  b: CartCustomization[] = []
): boolean {
  // Quick check: if lengths differ, arrays are not equal
  if (a.length !== b.length) return false;

  // Sort both arrays by ID to ensure order doesn't affect comparison
  const aSorted = [...a].sort((x, y) => x.id.localeCompare(y.id));
  const bSorted = [...b].sort((x, y) => x.id.localeCompare(y.id));

  // Check if every item in sorted array A has a matching item in sorted array B
  return aSorted.every((item, idx) => item.id === bSorted[idx].id);
}

/**
 * Shopping Cart Store Implementation
 *
 * Uses Zustand for lightweight state management without boilerplate.
 * Manages cart items with full support for customizations and quantity tracking.
 */
export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state: empty cart
  items: [],

  /**
   * Add an item to the cart
   * If the exact same item (including customizations) exists, increment quantity
   * Otherwise, add as a new cart item with quantity 1
   */
  addItem: (item) => {
    const customizations = item.customizations ?? [];

    // Search for existing item with same ID and customizations
    const existing = get().items.find(
      (i) =>
        i.id === item.id &&
        areCustomizationsEqual(i.customizations ?? [], customizations)
    );

    if (existing) {
      // Item exists: increment quantity
      set({
        items: get().items.map((i) =>
          i.id === item.id &&
          areCustomizationsEqual(i.customizations ?? [], customizations)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      // New item: add to cart with quantity 1
      set({
        items: [...get().items, { ...item, quantity: 1, customizations }],
      });
    }
  },

  /**
   * Remove an entire item (all quantities) from the cart
   * Matches by ID and customizations to remove the exact variant
   */
  removeItem: (id, customizations = []) => {
    set({
      items: get().items.filter(
        (i) =>
          !(
            i.id === id &&
            areCustomizationsEqual(i.customizations ?? [], customizations)
          )
      ),
    });
  },

  /**
   * Increase the quantity of a specific cart item by 1
   * Matches by ID and customizations to update the correct variant
   */
  increaseQty: (id, customizations = []) => {
    set({
      items: get().items.map((i) =>
        i.id === id &&
        areCustomizationsEqual(i.customizations ?? [], customizations)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    });
  },

  /**
   * Decrease the quantity of a specific cart item by 1
   * If quantity reaches 0, automatically remove the item from cart
   */
  decreaseQty: (id, customizations = []) => {
    set({
      items: get()
        .items.map((i) =>
          i.id === id &&
          areCustomizationsEqual(i.customizations ?? [], customizations)
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0), // Remove items with 0 quantity
    });
  },

  /**
   * Clear all items from the cart
   * Used for checkout completion or manual cart reset
   */
  clearCart: () => set({ items: [] }),

  /**
   * Calculate the total number of items in the cart
   * Sums up quantities of all cart items
   *
   * @returns Total count of all items (considering quantities)
   */
  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  /**
   * Calculate the total price of all items in the cart
   * Includes base item prices plus customization costs
   *
   * @returns Total cart value in dollars
   */
  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      const base = item.price; // Base item price

      // Calculate total customization costs for this item
      const customPrice =
        item.customizations?.reduce(
          (sum: number, customization: CartCustomization) =>
            sum + customization.price,
          0
        ) ?? 0;

      // Add (base + customizations) * quantity to total
      return total + item.quantity * (base + customPrice);
    }, 0),
}));
