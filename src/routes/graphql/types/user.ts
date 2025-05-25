import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { Context } from './context.js';
import { SubscribersOnAuthors } from '@prisma/client';


export const UserType = new GraphQLObjectType<UserInterface, Context>({
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
      resolve: async (parent, _, { loader }) => {
        return await loader.post.load(parent.id)
      },
    },
   profile: {
    type: ProfileType as GraphQLObjectType,
    resolve: async (parent, _, { loader }) => {
      return await loader.profile.load(parent.id);
    },
  },
   userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _, { loader }) => {
        return await loader.userSubscribedTo.load(parent.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _, { loader }) => {
        return await loader.subscribedToUser.load(parent.id);
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
  balance: number;
  profile: string;
  posts: string;
  userSubscribedTo: SubscribersOnAuthors[];
  subscribedToUser: SubscribersOnAuthors[];
}