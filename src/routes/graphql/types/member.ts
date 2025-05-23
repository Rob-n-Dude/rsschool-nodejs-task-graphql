import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ProfileType, ProfileTypeInterface } from './profile.js';
import { Context } from './context.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
})

export const MemberType = new GraphQLObjectType<MemberType, Context>({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(MemberTypeId)
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (parent, _, { prisma }: Context) => {
        return await prisma.profile.findMany({where:{memberTypeId: parent.id}})
      },
    },
  })
})


enum MemberTypeIdEnum {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

export interface MemberType {
  id: MemberTypeIdEnum;
  discount: number;
  postsLimitPerMonth: number;
  profiles: ProfileTypeInterface[];
}