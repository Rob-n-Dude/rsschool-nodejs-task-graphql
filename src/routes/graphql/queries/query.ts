import {  GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeId } from "../types/member.js";
import { UUIDType } from "../types/uuid.js";
import { UserInterface, UserType } from "../types/user.js";
import { PostInterface, PostType } from "../types/post.js";
import { ProfileType, ProfileTypeInterface } from "../types/profile.js";
import { Context } from "../types/context.js";
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from "graphql-parse-resolve-info";
import { ApplicationLoader } from "../loaders/loaders.js";
import { SubscribersOnAuthors } from "@prisma/client";

type ReturnType = MemberType | PostInterface | ProfileTypeInterface | UserInterface

type PrimeLoaderKey = 'userSubscribedTo' | 'subscribedToUser';

const primeLoader = ({
  loader,
  data,
  loaderKey,
}: {
  loader: Pick<ApplicationLoader, PrimeLoaderKey>, 
  data: UserInterface[],
  loaderKey: PrimeLoaderKey,
}): void => {
  const result = data.reduce((acc, item, _, self) => {
    const itemId = item.id;

    acc[itemId] = item.userSubscribedTo.map((subItem: SubscribersOnAuthors)=> {;
      const { subscriberId } = subItem;

      return self.find(({ id }) => id === subscriberId);
    }) as unknown as UserInterface[];

    return acc
  }, {} as Record<string, UserInterface[]>)

  Object.entries(result).forEach(([userId, subscribedUsers]) => {
    loader[loaderKey].prime(userId, subscribedUsers as unknown as UserInterface[] & PromiseLike<UserInterface> )
  })
}

export const AppQuery = new GraphQLObjectType<ReturnType, Context>({
  name: "Query",
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType), 
      resolve: async (_, __, context) => {
        const { prisma } = context
        return await prisma.memberType.findMany()
      },
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: { id: string }, context) => {
        const { prisma } = context
        return await prisma.memberType.findUnique({
          where: {
            id,
          }})
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, context, info) => {
        const { prisma, loader } = context

        const parsedInfo = parseResolveInfo(info);
        const simplifiedParsedInfo = simplifyParsedResolveInfoFragmentWithType(parsedInfo as ResolveTree, new GraphQLNonNull(UserType));

        const isSubscribedToUser = !!simplifiedParsedInfo.fields['subscribedToUser'];
        const isUserSubscribedTo = !!simplifiedParsedInfo.fields['userSubscribedTo'];
        const users = await prisma.user.findMany({
          include: {
            userSubscribedTo: isUserSubscribedTo,
            subscribedToUser: isSubscribedToUser,
          }
        })

        if (isUserSubscribedTo) {
          primeLoader({
            loader,
            data: users as UserInterface[],
            loaderKey: 'userSubscribedTo',
          })
        }

        if (isSubscribedToUser) {
          primeLoader({
            loader,
            data: users as UserInterface[],
            loaderKey: 'subscribedToUser',
          })
        }

        return users
      },
    },
    user: {
      type: UserType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context) => {
        const { prisma } = context
        return await prisma.user.findUnique({
          where: {
            id,
          }
        })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, context) => {
        const { prisma } = context
        return await prisma.post.findMany()
      }
    },
    post: {
      type: PostType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context) => {
        const { prisma } = context
        return await prisma.post.findUnique({
          where: {
            id,
          }
        })
      }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, __, context) => {
        const { prisma } = context
        return await prisma.profile.findMany()
      }
    },
    profile: {
      type: ProfileType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context) => {
        const { prisma } = context
        return await prisma.profile.findUnique({
          where: {
            id,
          }
        })
      }
    }
  },
})