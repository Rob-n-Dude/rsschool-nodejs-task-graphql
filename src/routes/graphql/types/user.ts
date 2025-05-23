import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.post.findMany({
          where: {
            authorId: parent.id,
          }
        })
      },
    },
   profile: {
    type: ProfileType as GraphQLObjectType,
    resolve: async (parent, _, { prisma }) => {
      const result = await prisma.profile.findUnique({
        where: {
          userId: parent.id,
        },
      });
      return result;
    },
  },
   userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findMany({
          where: { 
            subscribedToUser: { 
              some: { 
                subscriberId: parent.id 
              } 
            } 
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _, { prisma }) => {
        const result = await prisma.user.findMany({
          where: {
            userSubscribedTo: { 
              some: { 
                authorId: parent.id
              }
            },
          },
        });
        return result;
      },
    },
  })
})

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
     name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  })
})

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
     name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  })
})

export interface CreateUserInputInterface {
  name: string;
  balance: number;
}

export interface ChangeUserInputInterface {
  name: string; 
  balance: number;
}

export interface UserInterface {
  id: string;
  name: string;
  balance: string;
  profile: string;
  posts: string;
  userSubscribedTo: UserInterface[];
  subscribedToUser: UserInterface[];
}