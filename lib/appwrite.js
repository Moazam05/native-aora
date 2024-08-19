import { Client } from "react-native-appwrite";

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
