/**
 * Constants and Asset Imports
 *
 * This file centralizes all static assets, categories, and configuration data
 * used throughout the food delivery app. It provides easy access to images,
 * icons, and predefined data structures.
 */

// =============================================================================
// ICON IMPORTS
// =============================================================================
import arrowDown from "@/assets/icons/arrow-down.png";
import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import dollar from "@/assets/icons/dollar.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import user from "@/assets/icons/user.png";
import arrowBack from "../assets/icons/arrow-back.png";

// =============================================================================
// IMAGE IMPORTS
// =============================================================================
import avatar from "@/assets/images/avatar.png";
import avocado from "@/assets/images/avocado.png";
import bacon from "@/assets/images/bacon.png";
import burgerOne from "@/assets/images/burger-one.png";
import burgerTwo from "@/assets/images/burger-two.png";
import buritto from "@/assets/images/buritto.png";
import cheese from "@/assets/images/cheese.png";
import coleslaw from "@/assets/images/coleslaw.png";
import cucumber from "@/assets/images/cucumber.png";
import emptyState from "@/assets/images/empty-state.png";
import fries from "@/assets/images/fries.png";
import loginGraphic from "@/assets/images/login-graphic.png";
import logo from "@/assets/images/logo.png";
import mozarellaSticks from "@/assets/images/mozarella-sticks.png";
import mushrooms from "@/assets/images/mushrooms.png";
import onionRings from "@/assets/images/onion-rings.png";
import onions from "@/assets/images/onions.png";
import pizzaOne from "@/assets/images/pizza-one.png";
import salad from "@/assets/images/salad.png";
import success from "@/assets/images/success.png";
import tomatoes from "@/assets/images/tomatoes.png";

// =============================================================================
// FOOD CATEGORIES
// =============================================================================

/**
 * Available food categories for filtering menu items
 * Used in the main menu screen for category selection
 */
export const CATEGORIES = [
  {
    id: "1",
    name: "All", // Shows all menu items regardless of type
  },
  {
    id: "2",
    name: "Burger", // Burger category items
  },
  {
    id: "3",
    name: "Pizza", // Pizza category items
  },
  {
    id: "4",
    name: "Wrap", // Wrap category items
  },
  {
    id: "5",
    name: "Burrito", // Burrito category items
  },
];

// =============================================================================
// PROMOTIONAL OFFERS
// =============================================================================

/**
 * Special promotional offers displayed on the home screen
 * Each offer includes styling colors and featured images
 */
export const offers = [
  {
    id: 1,
    title: "SUMMER COMBO",
    image: burgerOne,
    color: "#D33B0D", // Brand red color for summer theme
  },
  {
    id: 2,
    title: "BURGER BASH",
    image: burgerTwo,
    color: "#DF5A0C", // Orange variant for burger promotion
  },
  {
    id: 3,
    title: "PIZZA PARTY",
    image: pizzaOne,
    color: "#084137", // Dark green for pizza theme
  },
  {
    id: 4,
    title: "BURRITO DELIGHT",
    image: buritto,
    color: "#EB920C", // Warm orange for burrito promotion
  },
];

// =============================================================================
// MENU CUSTOMIZATIONS
// =============================================================================

/**
 * Available side dishes for meal customization
 * Used in the meal details screen for add-ons
 */
export const sides = [
  {
    name: "Fries",
    image: fries,
    price: 3.5, // Price in USD
  },
  {
    name: "Onion Rings",
    image: onionRings,
    price: 4.0,
  },
  {
    name: "Mozarella Sticks",
    image: mozarellaSticks,
    price: 5.0,
  },
  {
    name: "Coleslaw",
    image: coleslaw,
    price: 2.5,
  },
  {
    name: "Salad",
    image: salad,
    price: 4.5,
  },
];

/**
 * Available toppings for meal customization
 * Used in the meal details screen for ingredient add-ons
 */
export const toppings = [
  {
    name: "Avocado",
    image: avocado,
    price: 1.5, // Additional cost in USD
  },
  {
    name: "Bacon",
    image: bacon,
    price: 2.0,
  },
  {
    name: "Cheese",
    image: cheese,
    price: 1.0,
  },
  {
    name: "Cucumber",
    image: cucumber,
    price: 0.5,
  },
  {
    name: "Mushrooms",
    image: mushrooms,
    price: 1.2,
  },
  {
    name: "Onions",
    image: onions,
    price: 0.5,
  },
  {
    name: "Tomatoes",
    image: tomatoes,
    price: 0.7,
  },
];

// =============================================================================
// CENTRALIZED IMAGE EXPORTS
// =============================================================================

/**
 * Centralized object containing all app images and icons
 * Provides easy access to assets throughout the application
 * Organized by type: food images, UI icons, and misc graphics
 */
export const images = {
  // User and misc images
  avatar,
  emptyState,
  loginGraphic,
  logo,
  success,

  // Food images
  avocado,
  bacon,
  burgerOne,
  burgerTwo,
  buritto,
  cheese,
  coleslaw,
  cucumber,
  fries,
  mozarellaSticks,
  mushrooms,
  onionRings,
  onions,
  pizzaOne,
  salad,
  tomatoes,

  // UI Icons
  arrowBack,
  arrowDown,
  arrowRight,
  bag,
  check,
  clock,
  dollar,
  envelope,
  home,
  location,
  logout,
  minus,
  pencil,
  person,
  phone,
  plus,
  search,
  star,
  trash,
  user,
};
