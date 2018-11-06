// tslint:disable:no-console
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import Feed from '../components/Feed';
import LoadMoreFeed from './LoadMore';

export const FEED_LIMIT = 3

export const GetFeedByCreatorAndTimeCreated = gql`
query ($groupId: String!, $creator: String!, $startDate: String!, $limit: Int!, $offset: Int){
    feeds: getFeedByCreatorAndTimeCreated(groupId: $groupId, creator: $creator, startDate: $startDate, limit: $limit, offset: $offset){
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
    private fetchMore: any;
    private feedLength: number = 0;

    public onLoadMore = (fetchMore: (options: any) => void, offset: number) => {
        fetchMore({
            updateQuery: ({ feeds }: any, { fetchMoreResult }: any) => {

                if (!fetchMoreResult) {
                    return { feeds };
                }

                if(fetchMoreResult.feeds.length > 0 ){
                    document.addEventListener('scroll', this.trackScrolling);
                } else {
                    document.removeEventListener('scroll', this.trackScrolling);
                }

                return { feeds: [...feeds, ...fetchMoreResult.feeds] };
            },
            variables: {
                offset
            }
        })
    }

    public isBottom(el: HTMLElement | null) {
        if (!el) {
            return false;
        }

        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    public componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    public trackScrolling = () => {
        const wrappedElement = document.getElementById('listfeed');
        if (this.isBottom(wrappedElement)) {
            document.removeEventListener('scroll', this.trackScrolling);
            this.onLoadMore(this.fetchMore, this.feedLength)
        }
    };

    public render() {
        return (
            <Query
                query={GetFeedByCreatorAndTimeCreated}
                variables={{ groupId: this.props.group.fbId, creator: '5b5fd6001cdce61b7cd8ad11', startDate: '2018-10-03T08:52:36.000', limit: FEED_LIMIT }}
            >
                {({ data, loading, error, fetchMore }) => {
                    if (loading) {
                        return <div>Loading...</div>
                    }

                    if (error) {
                        return <div>error {error.message}</div>
                    }
                    const feeds = data.feeds;

                    this.fetchMore = fetchMore;
                    this.feedLength = feeds.length || 0;

                    return (
                        <Fragment>
                            <div id="listfeed">
                                {feeds.map((feed: any) => <Feed {...this.props} feed={feed} key={feed.fbId} multiple={true} />)}
                            </div>
                            <LoadMoreFeed />
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default FeedList;
