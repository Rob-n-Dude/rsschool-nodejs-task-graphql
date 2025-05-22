import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType, CreateUserInputType, CreateUserInputInterface, ChangeUserInputType } from "../types/user.js";
import { UUIDType } from "../types/uuid.js";
import { ChangeProfileInputType, CreateProfileInputType, ProfileType } from "../types/profile.js";
import { ChangePostInputType, CreatePostInputType, PostType } from "../types/post.js";

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
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
       dto: {
        type: new GraphQLNonNull(CreatePostInputType)
       },
      },
      resolve: async (_, { title, content }, context) => {
        const { prisma } = context;

        return prisma.post.create({
          data: {
            title,
            content,
          },
        });
      }
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { 
          type: new GraphQLNonNull(UUIDType) 
        },
        dto: {
          type: new GraphQLNonNull(ChangePostInputType),
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { id, dto } = data as { id: string; dto: CreateUserInputInterface };

        return prisma.post.update({
          where: {
            id,
          },
          data: {
            ...dto,
          },
        });
      }
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { 
          type: new GraphQLNonNull(UUIDType) 
        },
      },
      resolve: async (_, { id }, context) => {
        const { prisma } = context;

        return prisma.post.delete({
          where: {
            id,
          },
        });
      }
    }
  }),
})