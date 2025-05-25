import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { UserInterface } from "../types/user.js";


type SubscriberType = Pick<UserInterface, 'id' | 'name' | 'balance'>;

type UserSubscriptionType = {
  subscriber: SubscriberType;
  authorId: string;
}
export const subscribeToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const userSubscriptions: UserSubscriptionType[] = await prisma.subscribersOnAuthors.findMany({
      where: {
        authorId: { in: [...ids] },
      },
      select: {
        subscriber: true,
        authorId: true,
      },
    });

    const subscriptions = userSubscriptions.reduce((acc, subscription) => {
      if (!acc[subscription.authorId]) {
        acc[subscription.authorId] = [];
      }
      acc[subscription.authorId].push(subscription.subscriber);
      return acc;
    }, {} as Record<string, SubscriberType[]>);

    return ids.map((id) => {
      return subscriptions[id] || []
    })
  })
}