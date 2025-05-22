import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType, CreateUserInputType, CreateUserInputInterface, ChangeUserInputType } from "../types/user.js";
import { UUIDType } from "../types/uuid.js";

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
    }
  }),
})