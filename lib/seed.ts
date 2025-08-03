import { ID } from "react-native-appwrite";
import { appwriteConfig, database, storage } from "./appwrite";
import dummyData from "./data";

// Define interfaces for the data
interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[]; // list of customization names
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

// Clear all documents from a collection
async function clearAll(collectionId: string): Promise<void> {
  const list = await database.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );

  // Delete all documents from the collection
  await Promise.all(
    list.documents.map((doc: any) =>
      database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  );
}

// Clear all files from the storage
async function clearStorage(): Promise<void> {
  const list = await storage.listFiles(appwriteConfig.bucketId);

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  );
}

// Upload image to storage
async function uploadImageToStorage(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }
    const blob = await response.blob();
    // Create file object for React Native
    const fileName = imageUrl.split("/").pop() || `file-${Date.now()}.png`;
    const fileObj = {
      name: fileName,
      type: blob.type,
      size: blob.size,
      uri: imageUrl, // Use original URL for React Native
    };
    // Try to upload to Appwrite storage
    try {
      const file = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        fileObj
      );
      const viewUrl = storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
      return viewUrl;
    } catch (error) {
      // Fallback to original URL if upload fails
      return imageUrl;
    }
  } catch (error) {
    // Fallback to original URL if fetch fails
    return imageUrl;
  }
}

// Seed the database
async function seed(): Promise<void> {
  // 1. Clear all
  await clearAll(appwriteConfig.categoryCollectionId);
  await clearAll(appwriteConfig.customizationCollectionId);
  await clearAll(appwriteConfig.menuCollectionId);
  await clearAll(appwriteConfig.menuCustomizationCollectionId);
  await clearStorage();

  // 2. Create Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoryCollectionId,
      ID.unique(),
      cat
    );
    categoryMap[cat.name] = doc.$id;
  }

  // 3. Create Customizations
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.customizationCollectionId,
      ID.unique(),
      {
        name: cus.name,
        price: Math.round(cus.price),
        type: cus.type,
      }
    );
    customizationMap[cus.name] = doc.$id;
  }

  // 4. Create Menu Items
  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    const uploadedImage = await uploadImageToStorage(item.image_url);
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        price: Math.round(item.price),
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      }
    );
    menuMap[item.name] = doc.$id;
    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCustomizationCollectionId,
        ID.unique(),
        {
          menu: doc.$id,
          customizations: customizationMap[cusName],
        }
      );
    }
  }
  // Only keep the final success log
  console.log("✅ Seeding complete.");
}

export default seed;
