import { merge } from 'lodash';

import { resolvers as resolversComment, typeDefs as Comment } from './Comment';
import { resolvers as resolversFeed, typeDefs as Feed } from './Feed';
import { defaults as defaultsGroup, resolvers as resolversGroup, typeDefs as Group } from './Group';
import { resolvers as resolversMember, typeDefs as Member } from './Member';
import { resolvers as resolversReaction, typeDefs as Reaction } from './Reaction';

import { resolvers as resolversMutation, typeDefs as Mutation } from './Mutation';
import { resolvers as resolversQuery, typeDefs as Query } from './Query';


export const typeDefs = [Query, Mutation, Group, Feed, Comment, Member, Reaction];
export const resolvers = merge(resolversMutation, resolversQuery, resolversGroup, resolversFeed, resolversComment, resolversMember, resolversReaction);
export const defaults = merge(defaultsGroup);
