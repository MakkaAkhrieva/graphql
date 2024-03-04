import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileObjectType } from './profile.js';
import { PostObjectType } from './post.js';
import { User } from './interfacesQuery.js';
import { GraphQLInputObjectType } from 'graphql/index.js';
import prismaApp from './prisma.js';

export const UserObjectType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    posts: {
      type: new GraphQLList(PostObjectType),
      resolve: async ({ id }: User) => {
        return await prismaApp.post.findMany({ where: { authorId: id } });
      },
    },

    profile: {
      type: ProfileObjectType,
      resolve: async ({ id }: User) => {
        return await prismaApp.profile.findFirst({ where: { userId: id } });
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserObjectType),
      resolve: async ({ id }: User) => {
        const results = await prismaApp.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });
        return results.map((result) => result.subscriber);
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserObjectType),
      resolve: async ({ id }: User) => {
        const results = await prismaApp.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });
        return results.map((result) => result.author);
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
