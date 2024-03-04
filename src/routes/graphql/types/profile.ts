import {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberObjectType, MemberTypeId } from './member.js';
import { Profile } from './interfacesQuery.js';
import prismaApp from './prisma.js';
import { UserObjectType } from './user.js';

export const ProfileObjectType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: UserObjectType,
      resolve: async ({ userId }: Profile) => {
        return prismaApp.user.findFirst({ where: { id: userId } });
      },
    },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberObjectType,
      resolve: async ({ memberTypeId }: Profile) => {
        return await prismaApp.memberType.findFirst({ where: { id: memberTypeId } });
      },
    },
  }),
});

export const CreateProfileInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});

export const ChangeProfileInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    MemberTypeId: { type: MemberTypeId },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});
