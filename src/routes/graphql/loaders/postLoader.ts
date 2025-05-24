import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { PostInterface } from "../types/post.js";

type OmitAuthorPostInterface = Omit<PostInterface, 'author'>

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const posts: OmitAuthorPostInterface[] = (await prisma.post.findMany({
      where: {
        authorId: { in: [...ids] },
      },
    }));

    const postsByAuthor = posts.reduce((acc, post) => {
      if (!acc[post.authorId]) {
        acc[post.authorId] = [];
      }

      acc[post.authorId].push(post);
      return acc;
    }, {} as Record<string, OmitAuthorPostInterface[]>);


    return ids.map((id) => {
      return postsByAuthor[id];
    });
  })
}