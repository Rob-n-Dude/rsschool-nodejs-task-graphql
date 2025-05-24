import { PrismaClient } from "@prisma/client";
import { profileLoader } from "./profileLoader.js";
import DataLoader from "dataloader";
import { ProfileTypeInterface } from "../types/profile.js";
import { postLoader } from "./postLoader.js";
import { PostInterface } from "../types/post.js";

export const getApplicationLoader = (prisma: PrismaClient) => ({
  profile: profileLoader(prisma),
  post: postLoader(prisma)
})

export interface ApplicationLoader {
  profile: DataLoader<string, ProfileTypeInterface>;
  post: DataLoader<string, PostInterface>;
}