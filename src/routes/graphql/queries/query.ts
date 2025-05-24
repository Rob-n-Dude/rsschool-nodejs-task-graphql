import {  GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeId } from "../types/member.js";
import { UUIDType } from "../types/uuid.js";
import { UserInterface, UserType } from "../types/user.js";
import { PostInterface, PostType } from "../types/post.js";
import { ProfileType, ProfileTypeInterface } from "../types/profile.js";
import { Context } from "../types/context.js";

type ReturnType = MemberType | PostInterface | ProfileTypeInterface | UserInterface

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
      resolve: async (_, __, context) => {
        const { prisma } = context
        return await prisma.user.findMany()
      }
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