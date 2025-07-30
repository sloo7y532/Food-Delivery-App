import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "../type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "6881f5dd0027e07482d3",
  userCollectionId: "6888990e0001878efe53",
  //   foodCollectionId: "6881f5dd0027e07482d5",
  Platform: "com.saleh.Food-Delivery",
};

// Appwrite Client
export const client = new Client();

// Appwrite Client Configuration
client.setEndpoint(appwriteConfig.endpoint);
client.setProject(appwriteConfig.projectId);
client.setPlatform(appwriteConfig.Platform);

// Appwrite Services
export const account = new Account(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);

// Create User
export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    // Create User Account
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create account");

    // Create User Avatar
    const avatarUrl = avatars.getInitialsURL(name);

    // Create User Data
    const userData = {
      email,
      name,
      accountid: newAccount.$id,
      avatar: avatarUrl,
    };

    // Create User in Database
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

// Sign In User
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    console.error("Sign in error:", e);
    throw new Error(e as string);
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    // Get Current User from Database
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    // Return Current User
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};
