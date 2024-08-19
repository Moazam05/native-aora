import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { Alert } from "react-native";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.moazam05.aora",
  projectId: "66c2076b002b61fa5551",
  databaseId: "66c2099b0039469f0c60",
  userCollectionId: "66c209d100322df48dfe",
  videoCollectionId: "66c20a200006f0c3022c",
  storageId: "66c3807900026e6a9f45",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    if (!newUser) throw new Error("Failed to create user in database");
    return newUser;
  } catch (error) {
    console.log("CreateUser Error:", error.message);
    Alert.alert("Error", `CreateUser Error: ${error.message}`);
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    // Log out existing session, if any
    await account.deleteSessions();

    const response = await account.createEmailPasswordSession(email, password);
    if (!response) throw new Error("Failed to create a session");

    return response;
  } catch (error) {
    console.log("SignIn Error:", error.message);
    Alert.alert("Error", `SignIn Error: ${error.message}`);
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("Failed to retrieve current user");

    const currentUser = await databases.getDocument(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    console.log("currentUser", currentUser);

    if (!currentUser)
      throw new Error("Failed to retrieve user data from database");
    return currentUser.documents[0];
  } catch (error) {
    console.log("GetCurrentUser Error:", error.message);
    Alert.alert("Error", `GetCurrentUser Error: ${error.message}`);
    throw new Error(error.message);
  }
};
