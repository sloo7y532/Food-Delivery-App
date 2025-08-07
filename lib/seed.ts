/**
 * Database Seeding Utility
 *
 * This file provides functionality to populate the Appwrite database with
 * initial demo data for the food delivery app. It handles the complete
 * setup process including data relationships and file uploads.
 *
 * ⚠️  WARNING: This script will clear all existing data before seeding!
 */

import { ID } from "react-native-appwrite";
import { appwriteConfig, database, storage } from "./appwrite";
import dummyData from "./data";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Food category structure for database seeding
 */
interface Category {
  name: string; // Category name (e.g., "Burgers")
  description: string; // Brief description of the category
}

/**
 * Customization option structure for database seeding
 */
interface Customization {
  name: string; // Customization name (e.g., "Extra Cheese")
  price: number; // Additional cost in cents
  type: "topping" | "side" | "size" | "crust" | string; // Type of customization
}

/**
 * Menu item structure for database seeding
 */
interface MenuItem {
  name: string; // Item name
  description: string; // Item description
  image_url: string; // URL to item image (will be uploaded to storage)
  price: number; // Price in cents
  rating: number; // Average rating (1-5 scale)
  calories: number; // Nutritional info: calories
  protein: number; // Nutritional info: protein in grams
  category_name: string; // Associated category name
  customizations: string[]; // List of available customization names
}

/**
 * Complete dummy data structure
 */
interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

// Type-check the imported dummy data to ensure it matches our interfaces
const data = dummyData as DummyData;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Clear all documents from a specific collection
 *
 * Used to reset collections before seeding fresh data.
 * This ensures a clean state without duplicate entries.
 *
 * @param collectionId - The ID of the collection to clear
 */
async function clearAll(collectionId: string): Promise<void> {
  const list = await database.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );

  // Delete all documents from the collection in parallel for efficiency
  await Promise.all(
    list.documents.map((doc: any) =>
      database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  );
}

/**
 * Clear all files from the storage bucket
 *
 * Removes all previously uploaded images before seeding new ones.
 * This prevents storage bloat from repeated seeding operations.
 */
async function clearStorage(): Promise<void> {
  const list = await storage.listFiles(appwriteConfig.bucketId);

  // Delete all files in parallel for efficiency
  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  );
}

/**
 * Upload an image from URL to Appwrite storage
 *
 * Downloads an image from an external URL and uploads it to Appwrite storage.
 * This ensures all menu item images are hosted on our storage service.
 *
 * @param imageUrl - External URL of the image to upload
 * @returns The Appwrite storage URL for the uploaded image, or original URL if upload fails
 */
async function uploadImageToStorage(imageUrl: string) {
  try {
    // Step 1: Download the image from the external URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }
    const blob = await response.blob();

    // Step 2: Prepare file object for React Native
    const fileName = imageUrl.split("/").pop() || `file-${Date.now()}.png`;
    const fileObj = {
      name: fileName,
      type: blob.type,
      size: blob.size,
      uri: imageUrl, // Use original URL for React Native file upload
    };

    // Step 3: Upload to Appwrite storage
    try {
      const file = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        fileObj
      );
      const viewUrl = storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
      return viewUrl;
    } catch (error) {
      // Fallback: Use original URL if storage upload fails
      console.warn("Storage upload failed, using original URL:", error);
      return imageUrl;
    }
  } catch (error) {
    // Fallback: Use original URL if image fetch fails
    console.warn("Image fetch failed, using original URL:", error);
    return imageUrl;
  }
}

// =============================================================================
// MAIN SEEDING FUNCTION
// =============================================================================

/**
 * Seed the database with demo data
 *
 * This function performs a complete database setup:
 * 1. Clears all existing data (collections and storage)
 * 2. Creates categories with proper IDs
 * 3. Creates customization options
 * 4. Creates menu items with uploaded images
 * 5. Links menu items to their available customizations
 *
 * The process maintains referential integrity by creating ID mappings
 * between related entities.
 *
 * ⚠️ WARNING: This will delete all existing data!
 */
async function seed(): Promise<void> {
  console.log("🧹 Clearing existing data...");

  // Step 1: Clear all existing data to start fresh
  await clearAll(appwriteConfig.categoryCollectionId);
  await clearAll(appwriteConfig.customizationCollectionId);
  await clearAll(appwriteConfig.menuCollectionId);
  await clearAll(appwriteConfig.menuCustomizationCollectionId);
  await clearStorage();

  console.log("📂 Creating categories...");

  // Step 2: Create food categories and map names to IDs
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoryCollectionId,
      ID.unique(),
      cat
    );
    categoryMap[cat.name] = doc.$id; // Store name -> ID mapping
  }

  console.log("🍯 Creating customizations...");

  // Step 3: Create customization options and map names to IDs
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.customizationCollectionId,
      ID.unique(),
      {
        name: cus.name,
        price: Math.round(cus.price), // Ensure integer pricing
        type: cus.type,
      }
    );
    customizationMap[cus.name] = doc.$id; // Store name -> ID mapping
  }

  console.log("🍔 Creating menu items and relationships...");

  // Step 4: Create menu items with image uploads
  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    // Upload item image to Appwrite storage
    const uploadedImage = await uploadImageToStorage(item.image_url);

    // Create menu item document
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        price: Math.round(item.price), // Ensure integer pricing
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name], // Link to category
      }
    );
    menuMap[item.name] = doc.$id;

    // Step 5: Create menu-customization relationships
    // This links each menu item to its available customizations
    for (const cusName of item.customizations) {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCustomizationCollectionId,
        ID.unique(),
        {
          menu: doc.$id, // Menu item ID
          customizations: customizationMap[cusName], // Customization ID
        }
      );
    }
  }

  console.log("✅ Seeding complete! Database is ready for use.");
}

export default seed;
