import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: { in: [...ids] },
      },
    })

    const profilesById = ids.map((id) => {
      return profiles.find(profile => profile.userId === id)
    })

    return profilesById
  })
}