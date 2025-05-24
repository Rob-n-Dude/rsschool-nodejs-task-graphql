import { PrismaClient } from "@prisma/client";
import { ApplicationLoader } from "../loaders/loaders.js";

export interface Context {
  prisma: PrismaClient;
  loader: ApplicationLoader
}