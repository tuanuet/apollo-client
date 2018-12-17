// tslint:disable:no-console
import gql from "graphql-tag";
import { GET_COMMENT_FROM_FEEDID } from '../components/Feed';
import { GET_DETAIL_FEED } from '../views/DetailFeed/Container';

export const typeDefs = `
type Comment {
    fbId: String!
    message: String
    attachments: [String]
    commentCount: Int
    from: Member
    comments: [Comment]
    createdAt: String
    creationCount: Int
}

extends type Query {
  comments: [Comment]
}
`

function getRandomInt(max: number = 10000000) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const resolvers = {
  Mutation: {
    addComment: (_: any, input: any, { cache, getCacheKey }: any) => {

      const { postId, comment } = input;
      comment.__typename = 'Comment'
      comment.fbId = getRandomInt();

      const query = GET_DETAIL_FEED;
      const previous = cache.readQuery({ query, variables: { fbId: input.postId } });

      const { detailFeed = {} } = previous;
      detailFeed.comments.push(comment);

      cache.writeQuery({
        data: { detailFeed },
        query,
        variables: { fbId: input.postId }
      });

      return comment;
    },
    addCommentInFeeds: (_: any, input: any, { cache }: any) => {
      const { comment } = input;

      comment.__typename = 'Comment'
      comment.fbId = getRandomInt();

      const query = GET_COMMENT_FROM_FEEDID;
      const { comments } = cache.readQuery({ query, variables: input });

      comments.push(comment);

      cache.writeQuery({
        data: { comments },
        query,
        variables: input
      });

      return comment;
    },
  },
  Query: {

  }
}
