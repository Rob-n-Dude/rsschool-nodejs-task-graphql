import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { UserInterface } from "../types/user.js";


type AuthorTypeFromUser = Pick<UserInterface, 'id' | 'name' | 'balance'>;
type UserSubscriptionType = {
  author: AuthorTypeFromUser;
  subscriberId: string;
}

export const userSubscribeToLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const userSubscriptions: UserSubscriptionType[] = await prisma.subscribersOnAuthors.findMany({
      where: {
        subscriberId: { in: [...ids] },
      },
      select: {
        author: true,
        subscriberId: true,
      }
    });

    const subscribedAuthors = userSubscriptions.reduce((acc, subscription) => {
      if (!acc[subscription.subscriberId]) {
        acc[subscription.subscriberId] = [];
      }
      acc[subscription.subscriberId].push(subscription.author);
      return acc;
    }, {} as Record<string, AuthorTypeFromUser[]>);



    return ids.map((id) => {
      return subscribedAuthors[id]
    });
  });
}