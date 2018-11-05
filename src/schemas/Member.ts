import gql from "graphql-tag";

export const typeDefs = `
type Member {
    fbId: String!
    name: String
    picture: String
}
`
export const resolvers = {
    Mutation: {

    },
    Query: {

    }
}
