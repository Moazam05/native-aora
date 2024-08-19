import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

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

// todo: Create a new user
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
    if (!newAccount) throw Error;

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

    if (!newUser) throw Error;
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    if (!response) throw Error;

    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw Error;

    const currentUser = await databases.getDocument(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    console.log("currentUser", currentUser);

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
