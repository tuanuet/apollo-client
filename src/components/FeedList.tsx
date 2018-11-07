// tslint:disable:no-console
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import Feed from '../components/Feed';
import LoadMoreFeed from './LoadMore';

export const FEED_LIMIT = 3

export const GetFeedByCreatorAndTimeCreated = gql`
query ($groupId: String!, $limit: Int!, $offset: Int){
    feeds: getFeeds(groupId: $groupId, limit: $limit, offset: $offset){
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
            reactionCount
            createdAt
        }
    }
}
`;

class FeedList extends React.Component<any> {

    public onLoadMore = (fetchMore: (options: any) => void, offset: number) => {
        fetchMore({
            updateQuery: ({ feeds }: any, { fetchMoreResult }: any) => {

                if (!fetchMoreResult) {
                    return { feeds };
                }

                if (fetchMoreResult.feeds.length === 0) {
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

    public componentDidUpdate() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    public trackScrolling = () => {
        const wrappedElement = document.getElementById('listfeed');
        if (this.isBottom(wrappedElement)) {
            document.removeEventListener('scroll', this.trackScrolling);
            this.onLoadMore(this.props.data.fetchMore, this.props.data.feeds.length || 0)
        }
    };

    public render() {
        const { loading, error, feeds } = this.props.data;

        if (loading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>error {error.message}</div>
        }

        return (
            <Fragment>
                <div id="listfeed">
                    {feeds.map((feed: any) => <Feed {...this.props} feed={feed} key={feed.fbId} multiple={true} />)}
                </div>
                <LoadMoreFeed />
            </Fragment>
        )
    }
}

export default graphql<any>(GetFeedByCreatorAndTimeCreated, {
    options: (props: any) => ({
        variables: { groupId: props.group.fbId, limit: FEED_LIMIT }
    })
})(FeedList);
