import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { UserInterface, UserType } from "./user.js";

export const PostType = new GraphQLObjectType<PostType>({
  name: 'PostType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    author: {
      type: UserType as GraphQLObjectType,
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUnique({ where: { id: parent.authorId } });
      },
    },
  }),
})

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInputType',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    }
  }),
})

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInputType',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

interface PostType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: UserInterface
}