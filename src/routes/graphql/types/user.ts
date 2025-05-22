import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './member.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';


export const UserType = new GraphQLObjectType<UserInterface>({
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
    profile: {
      type: ProfileType,
    },
    posts: {
      type: new GraphQLList(PostType),
    },
    userSubscribedTo: {
      type: new GraphQLList(MemberType),
    },
    subscribedToUser: {
      type: new GraphQLList(MemberType),
    }
  })
})

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInputType',
  fields: () => ({
     name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  })
})

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInputType',
  fields: () => ({
     name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
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