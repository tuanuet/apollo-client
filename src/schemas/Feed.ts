import gql from "graphql-tag";

export const typeDefs = `
type Feed {
  fbId: String!
  message: String
  attachments: [String]
}

extends type Query {
  feeds: [Feed]
}
`
export const resolvers = {
    Mutation: {
        
    },
    Query: {

    }
}
