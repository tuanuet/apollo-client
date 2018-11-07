import gql from "graphql-tag";

export const typeDefs = `
    type Group {
        fbId: String!
        alias: String!
        name: String!
        description: String!
    }

    type selectedGroup: {
        alias: String!
    }

    extends type Query {
        group(fbId: String!): Group
    }

    extends type Mutation {
        addGroup(fbId: String!, alias: String!, name: String!, alias: description!): Group
        updateSelectedGroup(alias: String!): Group
    }
`

export const defaults = {
    groups: [],
    selectedGroup: {}
}

export const resolvers = {
    Mutation: {
        addGroup: async (_: any, input: any, { cache }: any) => {
            const query = gql`
                query GetGroups {
                    groups @client {
                        fbId, alias, description, name
                    }
                }
            `;
            const previous = cache.readQuery({ query });
            const newGroup = {
                ...input,
                __typename: 'Group',
            };

            cache.writeQuery({
                data: { groups: previous.groups.concat([newGroup]) },
                query
            });
            return newGroup;
        },

        updateSelectedGroup: async (_: any, input: any, { cache }: any) => {
            const query = gql`
            query {
                selectedGroup @client {
                    alias
                }
            }`;

            cache.writeQuery({
                data: {
                    selectedGroup: {
                        __typename: 'SelectedGroup',
                        ...input
                    }
                },
                query
            });


            return input;
        }
    }
}
