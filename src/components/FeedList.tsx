import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Feed from '../components/Feed';

export const GetFeedByCreatorAndTimeCreated = gql`
query ($groupId: String!, $creator: String!, $startDate: String!, $limit: Int!){
    feeds: getFeedByCreatorAndTimeCreated(groupId: $groupId, creator: $creator, startDate: $startDate, limit: $limit){
        fbId
        message
        from {
            fbId
            name
            picture
        }
        attachments
        commentCount
        reactionCount
        createdAt
        reactions(limit: 2){
            from {
                name
            }
        }
        comments(limit: 5, sort: "createdAt") {
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

class FeedList extends React.Component<any> {
    public render() {
        return (
            <Query
                query={GetFeedByCreatorAndTimeCreated}
                variables={{ groupId: this.props.group.fbId, creator: '5b5fd6001cdce61b7cd8ad11', startDate: '2018-10-03T08:52:36.000', limit: 4 }}
            >
                {({ data, loading, error }) => {
                    if (loading) {
                        return <div>Loading...</div>
                    }

                    if (error) {
                        return <div>error {error.message}</div>
                    }
                    const feeds = data.feeds;
                    return (
                        feeds.map((feed: any) => <Feed {...this.props} feed={feed} key={feed.fbId} multiple={true}/>)
                    )
                }}
            </Query>
        )
    }
}

export default FeedList;
