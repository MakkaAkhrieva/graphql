import { GraphQLObjectType, GraphQLBoolean } from 'graphql';
import {
  PostObjectType,
  ChangePostInputObjectType,
  CreatePostInputObjectType,
} from './types/post.js';
import { UUIDType } from './types/uuid.js';
import {
  ProfileObjectType,
  ChangeProfileInputObjectType,
  CreateProfileInputObjectType,
} from './types/profile.js';
import {
  UserObjectType,
  ChangeUserInputType,
  CreateUserInputType,
} from './types/user.js';
import { Post, Profile, User } from './types/interfacesQuery.js';
import prismaApp from './types/prisma.js';
import {
  CreateUser,
  ChangePost,
  CreatePost,
  ChangeProfile,
  CreateProfile,
  UserSubscribedTo,
  ChangeUser,
} from './types/interfacesMutation.js';

export const Mutations = new GraphQLObjectType({
  name: 'Mutation',

  fields: () => ({
    createUser: {
      type: UserObjectType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async (_parent, { dto }: CreateUser) => {
        return await prismaApp.user.create({ data: dto });
      },
    },

    changeUser: {
      type: UserObjectType,
      args: { id: { type: UUIDType }, dto: { type: ChangeUserInputType } },
      resolve: async (_parent, { id, dto }: ChangeUser) => {
        return await prismaApp.user.update({ where: { id: id }, data: dto });
      },
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: User) => {
        try {
          await prismaApp.user.delete({ where: { id: id } });
        } catch (err) {
          return false;
        }
        return true;
      },
    },

    createPost: {
      type: PostObjectType,
      args: { dto: { type: CreatePostInputObjectType } },
      resolve: async (_parent, { dto }: CreatePost) => {
        return await prismaApp.post.create({ data: dto });
      },
    },

    changePost: {
      type: PostObjectType,
      args: { id: { type: UUIDType }, dto: { type: ChangePostInputObjectType } },
      resolve: async (_parent, { id, dto }: ChangePost) => {
        return await prismaApp.post.update({ where: { id }, data: dto });
      },
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: Post) => {
        try {
          await prismaApp.post.delete({ where: { id } });
        } catch {
          return false;
        }
        return true;
      },
    },

    createProfile: {
      type: ProfileObjectType,
      args: { dto: { type: CreateProfileInputObjectType } },
      resolve: async (_parent, { dto }: CreateProfile) => {
        return await prismaApp.profile.create({ data: dto });
      },
    },

    changeProfile: {
      type: ProfileObjectType,
      args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputObjectType } },
      resolve: async (_parent, { id, dto }: ChangeProfile) => {
        return await prismaApp.profile.update({ where: { id }, data: dto });
      },
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: Profile) => {
        try {
          await prismaApp.profile.delete({ where: { id } });
        } catch (err) {
          return false;
        }
        return true;
      },
    },

    subscribeTo: {
      type: UserObjectType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, { userId, authorId }: UserSubscribedTo) => {
        await prismaApp.subscribersOnAuthors.create({
          data: { subscriberId: userId, authorId: authorId },
        });
        const user = await prismaApp.user.findFirst({ where: { id: userId } });
        return user;
      },
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (_parent, { userId, authorId }: UserSubscribedTo) => {
        try {
          await prismaApp.subscribersOnAuthors.deleteMany({
            where: { subscriberId: userId, authorId: authorId },
          });
        } catch {
          return false;
        }
        return true;
      },
    },
  }),
});
