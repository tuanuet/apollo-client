// tslint:disable:no-console
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { compose, lifecycle, pure, withHandlers, withProps, withState } from 'recompose';
import Feed from '../components/Feed';
import LoadMoreFeed from './LoadMore';

import { ErrorComponent, LoadingComponent, renderForError, renderWhileLoading } from './Base';
export const FEED_LIMIT = 3

export const GetFeedByCreatorAndTimeCreated = gql`
query ($groupId: String!, $limit: Int!, $offset: Int){
    feeds: getFeeds(groupId: $groupId, limit: $limit, offset: $offset){
        fbId
        message
        from {
            id
            fbId
            name
            picture
        }
        attachments
        commentCount
        reactionCount
        createdAt
        reactions(limit: 2){
            id
            from {
                fbId
                name
            }
        }

    }
}
`;

const withBottom = withState('bottom', 'setBottom', false);

const isBottom = (el: HTMLElement | null) => {
    if (!el) {
        return false;
    }

    return el.getBoundingClientRect().bottom <= window.innerHeight;
}

const FeedList = (props: any) => {
    const { feeds: feedsProps } = props.data;
    return (
        <Fragment>
            <div id="listfeed">
                {feedsProps.map((feed: any) => <Feed group={props.group} feed={feed} key={feed.fbId} multiple={true} />)}
            </div>
            <LoadMoreFeed />
        </Fragment>
    )
}


const setLoadMore = (propName = "data") =>
    withProps((props: any) => ({
        loadMore: props[propName] && props.bottom && props[propName].fetchMore({
            updateQuery: ({ feeds }: any, { fetchMoreResult }: any) => {

                props.setBottom(false);
                if (!fetchMoreResult) {
                    return { feeds };
                }

                if (fetchMoreResult.feeds.length === 0) {
                    document.addEventListener('scroll', props.onScrollBottom);
                }

                return { feeds: [...feeds, ...fetchMoreResult.feeds] };
            },
            variables: { offset: props[propName].feeds.length || 0 }
        })
    }))

const handleScroll = withHandlers({
    onScrollBottom: (props: any) => (event: EventListener) => {
        if (!props.bottom) {
            const wrappedElement = document.getElementById('listfeed');
            if (isBottom(wrappedElement)) {
                props.setBottom(true);
            }
        }
    }
})

const withScrollPicking = lifecycle<any, any>({
    componentDidMount() {
        document.addEventListener('scroll', this.props.onScrollBottom);
    },
    componentWillUnmount() {
        document.removeEventListener('scroll', this.props.onScrollBottom);
    }
});

export default compose<any, any>(
    withBottom,
    graphql<any>(GetFeedByCreatorAndTimeCreated, {
        options: (props: any) => ({
            variables: { groupId: props.group.fbId, limit: FEED_LIMIT },
        }),
    }),
    renderWhileLoading(LoadingComponent),
    renderForError(ErrorComponent),
    handleScroll,
    setLoadMore(),
    withScrollPicking,
    pure,
)(FeedList);
