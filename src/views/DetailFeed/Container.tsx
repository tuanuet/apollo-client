// tslint:disable:no-console
import gql from "graphql-tag";
import _ from 'lodash';
import React, { Fragment } from 'react';
import { compose, graphql, withApollo } from "react-apollo";
import { withState } from 'recompose';
import Feed from '../../components/Feed';

export const GET_DETAIL_FEED = gql`
query GetDetailFeed ($fbId: String!){
    detailFeed: getFeedByFbId(fbId: $fbId) {
        fbId
        message
        attachments
        createdAt
        from {
            id
            name
            fbId
            picture
        }
        commentCount
        reactionCount
        reactions(limit: 2) {
            id
            from {
                fbId
                name
            }
        }
        comments {
            from {
                id
                name
                fbId
                picture
            }
            fbId
            message
            commentCount
            reactionCount
            createdAt
        }
    }
}
`;

const SUBSCRIPTION_COMMENT = gql`
    subscription commentAdded($postId: String!) {
        commentAdded(postId: $postId) {
            from {
                id
                name
                fbId
                picture
            }
            fbId
            message
            commentCount
            reactionCount
            createdAt
        }
    }
`
class Container extends React.Component<any> {

    public componentDidMount() {
        const { detailFeedQuery } = this.props;
        detailFeedQuery.subscribeToMore({
            document: SUBSCRIPTION_COMMENT,
            updateQuery: (prev: any, { subscriptionData: { data: { commentAdded } } }: any) => {
                const { detailFeed } = prev;

                return {
                    detailFeed: {
                        ...detailFeed,
                        commentCount: detailFeed.commentCount + 1,
                        comments: detailFeed.comments.concat([commentAdded])
                    }
                }
            },
            variables: {
                postId: `${this.props.group.fbId}_${this.props.match.params.fbId}`
            }
        })
    }


    public render() {
        const { detailFeedQuery } = this.props;

        const { detailFeed, loading, error } = detailFeedQuery;
        if (loading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>error {error.message}</div>
        }

        return (
            <Feed group={this.props.group} feed={detailFeed} comments={[...detailFeed.comments]} multiple={false} />
        )
    }
}

export default graphql(GET_DETAIL_FEED, {
    name: 'detailFeedQuery',
    options: (props: any) => ({
        variables: { fbId: `${props.group.fbId}_${props.match.params.fbId}` },
    }),
})(withApollo(Container));
