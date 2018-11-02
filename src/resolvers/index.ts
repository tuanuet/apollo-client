import gql from "graphql-tag";
export default {
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
                __typename: 'GroupItem',
            };

            cache.writeQuery({
                data: { groups: previous.groups.concat([newGroup]) },
                query
            });
            return newGroup;
        },
    }
}
