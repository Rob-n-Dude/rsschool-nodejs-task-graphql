import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType, ChangeUserInput, CreateUserInputInterface, CreateUserInput, UserInterface } from "../types/user.js";
import { UUIDType } from "../types/uuid.js";
import { ChangeProfileInput, CreateProfileInputInterface, CreateProfileInput, ProfileType, ProfileTypeInterface, ChangeProfileInputInterface } from "../types/profile.js";
import { ChangePostInput, ChangePostInputInterface, CreatePostInput, CreatePostInputInterface, PostInterface, PostType } from "../types/post.js";
import { Context } from "../types/context.js";
import { MemberType } from "../types/member.js";

type ReturnType = 
  MemberType | 
  PostInterface | 
  ProfileTypeInterface | 
  UserInterface

export const AppMutation = new GraphQLObjectType<ReturnType, Context>({
  name: "Mutation",
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInput)
        },
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { dto } = data as { dto: CreateUserInputInterface };

        return await prisma.user.create({
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
          type: new GraphQLNonNull(ChangeUserInput),
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { id, dto } = data as { id: string; dto: CreateUserInputInterface };

        return await prisma.user.update({
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
      resolve: async (
        _, 
        { id }: {
          id: string
        }, 
        context
      ) => {
        const { prisma } = context;

        await prisma.user.delete({
          where: {
            id,
          },
        });
        return `User deleted with id: ${id}`; 
      }
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInput)
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { dto } = data as { dto: CreateProfileInputInterface };

        return await prisma.profile.create({
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
          type: new GraphQLNonNull(ChangeProfileInput),
        }
      },
      resolve: async (_, data, context) => {
        const { prisma } = context;
        const { id, dto } = data as { 
          id: string; 
          dto: ChangeProfileInputInterface 
        };

        return await prisma.profile.update({
          where: {
            id,
          },
          data: dto,
        });
      }
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: {id: string }, context) => {
        const { prisma } = context;
      
        await prisma.profile.delete({
          where: {
            id,
          },
        });

        return `Profile deleted with id: ${id}`; 
      },
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
       dto: {
        type: new GraphQLNonNull(CreatePostInput)
       },
      },
      resolve: async (
        _,
        { dto }: {
          dto: CreatePostInputInterface
        }, 
        context
      ) => {
        const { prisma } = context;

        return await prisma.post.create({
          data: dto
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
          type: new GraphQLNonNull(ChangePostInput),
        }
      },
      resolve: async (
        _, 
        data: { 
          id: string; 
          dto: ChangePostInputInterface
        }, 
        context
      ) => {
        const { prisma } = context;
        const { id, dto } = data
        return await prisma.post.update({
          where: {
            id,
          },
          data: dto,
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
      resolve: async (_, { id }: { id: string }, context) => {
        const { prisma } = context;
        await prisma.post.delete({
          where: {
            id,
          },
        });
        return `Post deleted with id: ${id}`;
      }
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { 
          type: new GraphQLNonNull(UUIDType) 
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType) 
        }
      },
      resolve: async (
        _, 
        { 
          userId, 
          authorId 
        }: {
          userId: string; 
          authorId: string
        }, 
        context
      ) => {
        const { prisma } = context;

        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId: authorId,
          }
        })

        return `${userId} subscribed to ${authorId}`
      }
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType)
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (
        _, 
        { 
          userId, 
          authorId 
        }: {
          userId: string,
          authorId: string
        }, context) => {
        const { prisma } = context;

        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            }
          }})
        
        return `${userId} unsubscribed from ${authorId}`
      }
    }
  },
})