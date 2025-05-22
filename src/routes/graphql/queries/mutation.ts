import { GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UserType, CreateUserInputType, CreateUserInputInterface, ChangeUserInputType } from "../types/user.js";
import { UUIDType } from "../types/uuid.js";
import { ChangeProfileInputType, CreateProfileInputType, ProfileType } from "../types/profile.js";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInputType)
        },
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { dto } = data as { dto: CreateUserInputInterface };

        return prisma.user.create({
          data: {
            ...dto,
          },
        });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangeUserInputType),
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { id, dto } = data as { id: string; dto: CreateUserInputInterface };

        return prisma.user.update({
          where: {
            id,
          },
          data: {
            ...dto,
          },
        });
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context) => {
        const { prisma } = context;

        return prisma.user.delete({
          where: {
            id,
          },
        });
      }
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInputType)
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { dto } = data as { dto: CreateUserInputInterface };

        return prisma.profile.create({
          data: {
            ...dto,
          },
        });
      }
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInputType),
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { id, dto } = data as { id: string; dto: CreateUserInputInterface };

        return prisma.profile.update({
          where: {
            id,
          },
          data: {
            ...dto,
          },
        });
      }
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }, context) => {
        const { prisma } = context;

        return prisma.profile.delete({
          where: {
            id,
          },
        });
      },
    }
  }),
})