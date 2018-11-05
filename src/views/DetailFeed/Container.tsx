// tslint:disable:no-console
import gql from "graphql-tag";
import _ from 'lodash';
import React, { Fragment } from 'react';
import { graphql } from "react-apollo";
import CommentList from '../../components/CommentList';
import Feed from '../../components/Feed';


export const GetCommentByFeedId = gql`
query ($fbId: String!){
    detailFeed: getFeedByFbId(fbId: $fbId) {
        fbId
        message
        attachments
        from {
            name
            fbId
            picture
        }
        commentCount
        reactionCount
        reactions(limit: 2) {
            from {
                name
            }
        }
        comments {
            from {
                name
                fbId
                picture
            }
            fbId
            message
            commentCount
            createdAt
        }
    }
}
`;

class Container extends React.Component<any> {

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
            <Feed group={this.props.group} feed={detailFeed} />
        )
    }
}

export default graphql(GetCommentByFeedId, {
    name: 'detailFeedQuery',
    options: (props: any) => ({
        variables: { fbId: `${props.group.fbId}_${props.match.params.fbId}` }
    })
})(Container);
