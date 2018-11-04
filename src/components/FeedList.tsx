import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Feed from '../components/Feed';

export const GetFeedByCreatorAndTimeCreated = gql`
query ($groupId: String!, $creator: String!, $startDate: String!){
    feeds: getFeedByCreatorAndTimeCreated(groupId: $groupId, creator: $creator, startDate: $startDate){
        fbId
        message
    }
}
`;

class FeedList extends React.PureComponent<any> {
    public render() {
        return (
            <Query
                query={GetFeedByCreatorAndTimeCreated}
                variables={{ groupId: this.props.group.fbId, creator: '5b5fd6001cdce61b7cd8ad11', startDate: '2018-10-03T08:52:36.000' }}
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
                        feeds.map((feed: any) => <Feed {...this.props} feed={feed} key={feed.fbId}/>)
                    )
                }}
            </Query>
        )
    }
}

export default FeedList;