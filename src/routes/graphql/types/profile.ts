import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./member.js";
import { UserInterface, UserType } from "./user.js";
import { Context } from "./context.js";

export const ProfileType = new GraphQLObjectType<ProfileTypeInterface, Context>({
  name: 'ProfileType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.memberType.findUnique({
          where: {
            id: parent.memberTypeId,
          },
        });
      }
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUnique({
          where: {
            id: parent.userId,
          },
        });
      }
    },
  }),
})

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields:{
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    }
  },
})

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  },
})

export interface CreateProfileInputInterface {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
}

export interface ChangeProfileInputInterface {
  isMale?: boolean;
  yearOfBirth?: number;
  memberTypeId?: string;
}

export interface ProfileTypeInterface { 
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
  user: UserInterface;
  memberType: MemberType;
} 