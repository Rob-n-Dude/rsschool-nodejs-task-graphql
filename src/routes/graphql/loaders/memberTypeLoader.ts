import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const members = await prisma.memberType.findMany({
      where: {
        id: { in: [...ids] },
      },
    });

    const membersById = ids.map((id) => {
      return members.find(member => member.id === id);
    });

    return membersById;
  });
}