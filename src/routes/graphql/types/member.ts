import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const MemberType = new GraphQLObjectType<MemberType>({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    }
  })
})

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeEnum',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
})

export interface MemberType {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}