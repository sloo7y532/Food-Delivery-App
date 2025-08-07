/**
 * Tailwind CSS Configuration for Food Delivery App
 *
 * This configuration file customizes Tailwind CSS for React Native using NativeWind.
 * It defines the app's design system including colors, fonts, and styling utilities.
 *
 * Key customizations:
 * - Brand colors (primary orange theme)
 * - Custom Quicksand font family variants
 * - Semantic color naming for UI states
 * - React Native component scanning paths
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan these paths for Tailwind classes
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],

  // Use NativeWind preset for React Native compatibility
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      // Custom color palette for the food delivery app
      colors: {
        primary: "#FE8C00", // Brand orange color for buttons, accents
        white: {
          DEFAULT: "#ffffff", // Pure white
          100: "#fafafa", // Off-white for subtle backgrounds
          200: "#FE8C00", // Orange variant (TODO: Consider renaming)
        },
        gray: {
          100: "#878787", // Medium gray for secondary text
          200: "#878787", // Same as 100 (TODO: Differentiate)
        },
        dark: {
          100: "#181C2E", // Dark navy for primary text
        },
        error: "#F14141", // Red for error states and validation
        success: "#2F9B65", // Green for success states
      },

      // Custom font family definitions using Quicksand
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
    },
  },

  // No additional plugins needed for this configuration
  plugins: [],
};
