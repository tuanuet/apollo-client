// tslint:disable:no-console
import gql from "graphql-tag";
import { GET_DETAIL_FEED } from 'src/views/DetailFeed/Container';
import { GetFeedByCreatorAndTimeCreated } from '../components/FeedList';

export const typeDefs = `
type Comment {
    fbId: String!
    message: String
    attachments: [String]
    commentCount: Int
    from: Member
    comments: [Comment]
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

            comment.__typename = 'Comment'
            detailFeed.comments.push(comment);

            cache.writeQuery({
                data: { detailFeed },
                query,
                variables: { fbId: input.postId }
            });

            return comment;
        },
        addCommentInFeeds: (_: any, input: any, { cache }: any) => {
            const query = GetFeedByCreatorAndTimeCreated;
            const { feeds } = cache.readQuery({ query, variables: input });

            const index = feeds.findIndex((feed: any) => feed.fbId === input.postId)
            if (index < 0) { // feed not exists
                return;
            }
            const { comment } = input;
            comment.__typename = 'Comment'

            feeds[index].comments.push(input.comment);

            cache.writeQuery({
                data: { feeds: [...feeds] },
                query,
                variables: input
            });

            return comment;
        },
    },
    Query: {

    }
}
