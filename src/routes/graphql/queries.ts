import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql/index.js';
import { UUIDType } from './types/uuid.js';
import { UserObjectType } from './types/user.js';
import { PostObjectType } from './types/post.js';
import { ProfileObjectType } from './types/profile.js';
import { MemberObjectType, MemberTypeId } from './types/member.js';
import { User, Post, Profile, Member } from './types/interfacesQuery.js';
import prismaApp from './types/prisma.js';

export const Query = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    user: {
      type: UserObjectType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: User) => {
        return await prismaApp.user.findFirst({ where: { id } });
      },
    },

    users: {
      type: new GraphQLList(UserObjectType),
      resolve: async () => {
        return await prismaApp.user.findMany();
      },
    },

    post: {
      type: PostObjectType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_parent, { id }: Post) => {
        return await prismaApp.post.findFirst({ where: { id } });
      },
    },

    posts: {
      type: new GraphQLList(PostObjectType),
      resolve: async () => {
        return await prismaApp.post.findMany();
      },
    },

    profile: {
      type: ProfileObjectType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: Profile) => {
        return await prismaApp.profile.findFirst({ where: { id } });
      },
    },

    profiles: {
      type: new GraphQLList(ProfileObjectType),
      resolve: async () => {
        return await prismaApp.profile.findMany({});
      },
    },

    memberType: {
      type: MemberObjectType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_parent, { id }: Member) => {
        return await prismaApp.memberType.findFirst({ where: { id } });
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberObjectType),
      resolve: async () => {
        return await prismaApp.memberType.findMany();
      },
    },
  }),
});
