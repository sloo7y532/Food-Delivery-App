import { Models } from "react-native-appwrite";

/**
 * Food Delivery App Type Definitions
 *
 * This file contains all TypeScript interfaces and types used throughout the app.
 * It includes data models, component props, and function parameters.
 */

// =============================================================================
// DATA MODELS
// =============================================================================

/**
 * Represents a menu item in the food delivery app
 * Extends Appwrite's Models.Document to include database fields
 */
export interface MenuItem extends Models.Document {
  name: string; // Display name of the menu item
  price: number; // Base price in dollars
  image_url: string; // URL/path to the item's image
  description: string; // Detailed description of the item
  calories: number; // Nutritional information - calories
  protein: number; // Nutritional information - protein in grams
  rating: number; // Average customer rating (1-5 scale)
  type: string; // Category type (burger, pizza, etc.)
}

/**
 * Represents a food category for organizing menu items
 */
export interface Category extends Models.Document {
  name: string; // Category name (e.g., "Burgers", "Pizza")
  description: string; // Brief description of the category
}

/**
 * Represents a user account in the system
 * Contains essential user information for authentication and profile
 */
export interface User extends Models.Document {
  name: string; // User's full name
  email: string; // User's email address (used for login)
  avatar: string; // Profile picture URL/path
}

// =============================================================================
// CART RELATED TYPES
// =============================================================================

/**
 * Represents a customization option for cart items
 * Used for toppings, sides, and other add-ons
 */
export interface CartCustomization {
  id: string; // Unique identifier for the customization
  name: string; // Display name (e.g., "Extra Cheese")
  price: number; // Additional cost for this customization
  type: string; // Type of customization (topping, side, etc.)
}

/**
 * Represents an item in the shopping cart
 * Includes base menu item info plus quantity and customizations
 */
export interface CartItemType {
  id: string; // Menu item ID reference
  name: string; // Item name for display
  price: number; // Base price of the item
  image_url: string; // Item image for cart display
  quantity: number; // Number of this item in cart
  customizations?: CartCustomization[]; // Optional add-ons and modifications
}

/**
 * Cart store interface defining all cart management functions
 * Uses Zustand for state management
 */
export interface CartStore {
  items: CartItemType[]; // Array of all cart items
  addItem: (item: Omit<CartItemType, "quantity">) => void; // Add new item or increase quantity
  removeItem: (id: string, customizations: CartCustomization[]) => void; // Remove specific item variant
  increaseQty: (id: string, customizations: CartCustomization[]) => void; // Increase item quantity
  decreaseQty: (id: string, customizations: CartCustomization[]) => void; // Decrease item quantity
  clearCart: () => void; // Empty the entire cart
  getTotalItems: () => number; // Get total item count
  getTotalPrice: () => number; // Calculate total cart value
}

// =============================================================================
// COMPONENT PROPS INTERFACES
// =============================================================================

/**
 * Props for tab bar icons in bottom navigation
 */
interface TabBarIconProps {
  focused: boolean; // Whether the tab is currently active
  icon: ImageSourcePropType; // Icon image source
  title: string; // Tab title text
}

/**
 * Props for payment information display components
 */
interface PaymentInfoStripeProps {
  label: string; // Label text for the field
  value: string; // Value to display
  labelStyle?: string; // Optional styling for label
  valueStyle?: string; // Optional styling for value
}

/**
 * Props for custom button component
 * Provides consistent button styling and behavior across the app
 */
interface CustomButtonProps {
  onPress?: () => void; // Button press handler
  title?: string; // Button text
  style?: string; // Custom styling classes
  leftIcon?: React.ReactNode; // Optional icon on the left side
  textStyle?: string; // Custom text styling
  isLoading?: boolean; // Loading state for async operations
}

/**
 * Props for custom header component
 */
interface CustomHeaderProps {
  title?: string; // Header title text
}

/**
 * Props for custom input field component
 * Provides consistent input styling and validation
 */
interface CustomInputProps {
  placeholder?: string; // Placeholder text
  value?: string; // Current input value
  onChangeText?: (text: string) => void; // Text change handler
  label: string; // Input label
  secureTextEntry?: boolean; // Hide text for passwords
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"; // Keyboard type
}

/**
 * Props for profile field display component
 */
interface ProfileFieldProps {
  label: string; // Field label
  value: string; // Field value
  icon: ImageSourcePropType; // Field icon
}

// =============================================================================
// API PARAMETER INTERFACES
// =============================================================================

/**
 * Parameters for creating a new user account
 */
export interface CreateUserParams {
  email: string; // User's email address
  password: string; // User's password
  name: string; // User's full name
}

/**
 * Parameters for user sign-in
 */
interface SignInParams {
  email: string; // User's email address
  password: string; // User's password
}

/**
 * Parameters for fetching menu items with filtering
 */
interface GetMenuParams {
  category: string; // Category filter ("All" for no filter)
  query: string; // Search query string
}
