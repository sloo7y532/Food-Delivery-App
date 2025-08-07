/**
 * Appwrite Backend Integration
 *
 * This file handles all interactions with the Appwrite backend service.
 * It includes authentication, database operations, and file storage management
 * for the food delivery app.
 */

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { CreateUserParams, GetMenuParams, SignInParams } from "../type";

/**
 * Appwrite Configuration
 *
 * Contains all the necessary IDs and endpoints for connecting to Appwrite services.
 * Database and collection IDs are specific to this project's Appwrite setup.
 */
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!, // Appwrite server endpoint
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!, // Project identifier
  databaseId: "6881f5dd0027e07482d3", // Main database ID
  bucketId: "688b1753002223315aeb", // File storage bucket ID
  Platform: "com.saleh.Food-Delivery", // Platform identifier for the app
  userCollectionId: "6888990e0001878efe53", // Users collection ID
  categoryCollectionId: "6889d6a100021769bf43", // Food categories collection ID
  menuCollectionId: "6889d7ab001b82283143", // Menu items collection ID
  customizationCollectionId: "6889d9a20021596bd92c", // Customizations collection ID
  menuCustomizationCollectionId: "688b15960024fb3c1d67", // Menu-customization relationship collection ID
};

/**
 * Appwrite Client Setup
 *
 * Initialize the Appwrite client and configure it with project settings.
 * This client instance is used by all Appwrite services.
 */
export const client = new Client();

// Configure the client with project-specific settings
client.setEndpoint(appwriteConfig.endpoint); // Set the Appwrite server URL
client.setProject(appwriteConfig.projectId); // Set the project ID
client.setPlatform(appwriteConfig.Platform); // Set platform identifier for analytics

/**
 * Appwrite Service Instances
 *
 * Initialize all required Appwrite services using the configured client.
 * These services provide different functionality areas.
 */
export const account = new Account(client); // User authentication and account management
export const database = new Databases(client); // Database operations (CRUD)
export const avatars = new Avatars(client); // Avatar generation service
export const storage = new Storage(client); // File upload and storage management

/**
 * Create a new user account
 *
 * This function handles the complete user registration process:
 * 1. Creates an authentication account in Appwrite
 * 2. Generates a default avatar using initials
 * 3. Creates a user document in the database with profile information
 *
 * @param params - User registration parameters (name, email, password)
 * @returns The created user document from the database
 * @throws Error if any step of the registration process fails
 */
export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    // Step 1: Create authentication account
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create account");

    // Step 2: Generate default avatar using user's initials
    const avatarUrl = avatars.getInitialsURL(name);

    // Step 3: Prepare user profile data
    const userData = {
      email,
      name,
      accountid: newAccount.$id, // Link to the authentication account
      avatar: avatarUrl,
    };

    // Step 4: Create user profile document in database
    const userDocument = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      userData
    );
    return userDocument;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error as string);
  }
};

/**
 * Authenticate user with email and password
 *
 * Creates a session for the user if credentials are valid.
 * The session is automatically stored by Appwrite for subsequent requests.
 *
 * @param params - Sign in credentials (email and password)
 * @returns Session object containing authentication details
 * @throws Error if authentication fails (invalid credentials, network issues, etc.)
 */
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    console.error("Sign in error:", e);
    throw new Error(e as string);
  }
};

/**
 * Get the currently authenticated user's profile
 *
 * This function retrieves the full user profile by:
 * 1. Getting the current authentication account
 * 2. Finding the corresponding user document in the database
 *
 * @returns User document with profile information
 * @throws Error if no user is authenticated or user profile not found
 */
export const getCurrentUser = async () => {
  try {
    // Step 1: Get the current authenticated account
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    // Step 2: Find the user profile document using the account ID
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    // Return the first (and should be only) user document found
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};

/**
 * Fetch menu items with optional filtering
 *
 * Retrieves menu items from the database with support for:
 * - Category filtering (e.g., "Burgers", "Pizza")
 * - Text search by item name
 * - Combined filters (category + search)
 *
 * @param params - Filter parameters (category and/or search query)
 * @returns Array of menu item documents matching the filters
 * @throws Error if database query fails
 */
export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    // Add category filter if specified (not "All")
    if (category && category !== "All") {
      queries.push(Query.equal("categories", category));
    }

    // Add text search filter if specified
    if (query && query.trim()) {
      queries.push(Query.search("name", query));
    }

    // Fetch menu items with applied filters
    const menu = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );
    return menu.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

/**
 * Fetch a specific menu item by its ID
 *
 * Retrieves detailed information for a single menu item.
 * Used when displaying item details or when adding items to cart.
 *
 * @param id - The unique identifier of the menu item
 * @returns Menu item document with all details
 * @throws Error if item not found or database query fails
 */
export const getMenuItemById = async (id: string) => {
  try {
    const menuItem = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      id
    );
    return menuItem;
  } catch (error) {
    throw new Error(error as string);
  }
};

/**
 * Fetch all available food categories
 *
 * Retrieves the list of food categories for filtering menu items.
 * Categories include items like "Burgers", "Pizza", "Sandwiches", etc.
 *
 * @returns Array of category documents
 * @throws Error if database query fails
 */
export const getCategories = async () => {
  try {
    const categories = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoryCollectionId
    );
    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
