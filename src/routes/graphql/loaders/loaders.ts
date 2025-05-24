import { PrismaClient } from "@prisma/client";
import { profileLoader } from "./profileLoader.js";
import DataLoader from "dataloader";
import { ProfileTypeInterface } from "../types/profile.js";
import { postLoader } from "./postLoader.js";
import { PostInterface } from "../types/post.js";
import { MemberType } from "../types/member.js";
import { memberTypeLoader } from "./memberTypeLoader.js";
import { UserInterface } from "../types/user.js";
import { userSubscribeToLoader } from "./userSubscribeToLoader.js";
import { subscribeToUserLoader } from "./subscribeToUserLoader.js";

export const getApplicationLoader = (prisma: PrismaClient) => ({
  profile: profileLoader(prisma),
  post: postLoader(prisma),
  memberType: memberTypeLoader(prisma),
  userSubscribeTo: userSubscribeToLoader(prisma),
  subscribeToUser: subscribeToUserLoader(prisma), 
})

export interface ApplicationLoader {
  profile: DataLoader<string, ProfileTypeInterface>;
  post: DataLoader<string, PostInterface>;
  memberType: DataLoader<string, MemberType>;
  userSubscribeTo: DataLoader<string, UserInterface>;
  subscribeToUser: DataLoader<string, UserInterface[]>;
}