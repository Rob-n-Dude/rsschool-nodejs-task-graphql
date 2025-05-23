import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./member.js";
import { UserType } from "./user.js";

export const ProfileType = new GraphQLObjectType({
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

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInputType',
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

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInputType',
  fields: {
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
    },
  },
})

export interface CreateProfileInputInterface {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
}