import { merge } from 'lodash';

import { resolvers as resolversFeed, typeDefs as Feed } from './Feed';
import { defaults as defaultsGroup, resolvers as resolversGroup, typeDefs as Group } from './Group';

import { resolvers as resolversMutation, typeDefs as Mutation } from './Mutation';
import { resolvers as resolversQuery, typeDefs as Query } from './Query';


export const typeDefs = [Query, Mutation, Group, Feed];
export const resolvers = merge(resolversMutation, resolversQuery, resolversGroup, resolversFeed);
export const defaults = merge(defaultsGroup);