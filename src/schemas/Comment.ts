// tslint:disable:no-console
import gql from "graphql-tag";
import { GET_DETAIL_FEED } from 'src/views/DetailFeed/Container';

export const typeDefs = `
type Comment {
    fbId: String!
    message: String
    attachments: [String]
    commentCount: Int
    from: Member
    createdAt: String
}

extends type Query {
  comments: [Comment]
}
`
export const resolvers = {
    Mutation: {
        addComment: (_: any, input: any, { cache }: any) => {
            const query = GET_DETAIL_FEED;
            const previous = cache.readQuery({ query, variables: { fbId: input.postId } });
            const { detailFeed = {} } = previous

            const { comment } = input;

            console.log('run');

            comment.__typename = 'CommentItem'
            detailFeed.comments.push(comment);

            cache.writeQuery({
                data: { detailFeed },
                query
            });

            return comment;
        }
    },
    Query: {

    }
}
