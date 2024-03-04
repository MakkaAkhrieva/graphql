import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { ProfileObjectType } from './profile.js';
import { Member, MemberEnumType } from './interfacesQuery.js';
import prismaApp from './prisma.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberEnumType.BASIC]: { value: MemberEnumType.BASIC },
    [MemberEnumType.BUSINESS]: { value: MemberEnumType.BUSINESS },
  },
});

export const MemberObjectType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberObjectType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileObjectType),
      resolve: async ({ id }: Member) => {
        return await prismaApp.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});
