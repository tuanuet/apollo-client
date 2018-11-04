// tslint:disable:no-console
import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, Query } from "react-apollo";
import Comment from '../components/Comment';


export const GetCommentByFeedId = gql`
query ($fbId: String!){
    detailFeed: getFeedByFbId(fbId: $fbId) {
        fbId
        message
        comments {
            fbId
            message
        }
    }
}
`;

class CommentList extends React.PureComponent<any> {
    public render() {
        const { detailFeedQuery } = this.props;

        const { detailFeed, loading, error } = detailFeedQuery;
        if (loading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>error {error.message}</div>
        }
        const comments = detailFeed.comments;
        return (
            comments.map((comment: any) => <Comment {...this.props} comment={comment} key={comment.fbId} />)
        )
    }
}

export default graphql(GetCommentByFeedId, {
    name: 'detailFeedQuery',
    options: (props: any) => ({
        variables: { fbId: `${props.group.fbId}_${props.match.params.fbId}` }
    })
})(CommentList);