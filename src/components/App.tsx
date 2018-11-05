import { library } from '@fortawesome/fontawesome-svg-core'
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons'

import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from "apollo-link-http";
import { withClientState } from 'apollo-link-state';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import { ApolloProvider } from "react-apollo";
import { Route, Router, Switch } from 'react-router-dom';
import { defaults, resolvers, typeDefs } from '../schemas';
import '../styles/App.css';
import DashboardPage from '../views/Dashboard';
import DetailFeedPage from '../views/DetailFeed';
import IndexPage from '../views/Index/Index';

library.add(faGrinAlt)

export const browserHistory = createBrowserHistory();
const cache = new InMemoryCache({
    cacheRedirects: {
        Query: {
            group: (_: any, args: any, { getCacheKey }) => {
                return getCacheKey({ __typename: 'GroupItem', fbId: args.fbId });
            }
        }
    },
    dataIdFromObject: (object: any) => {
        switch (object.__typename) {
            case 'GroupItem': return `GroupItem:${object.fbId}`; // use `key` as the primary key
            case 'CommentItem': return `CommentItem:${object.fbId}`; // use `key` as the primary key
            case 'FeedItem': return `FeedItem:${object.fbId}`; // use `key` as the primary key
            case 'DetailFeedItem': return `DetailFeedItem:${object.fbId}`; // use `key` as the primary key
            default: return defaultDataIdFromObject(object); // fall back to default handling
        }
    },

});

const stateLink = withClientState({
    // cache,
    defaults,
    resolvers,
    typeDefs
});


const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });
const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink]).concat(httpLink)
});

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <Router history={browserHistory}>
                    <Switch>
                        <Route exact={true} path="/" name="Index" component={IndexPage} />
                        <Route exact={true} path="/:alias" name="Group" component={DashboardPage} />
                        <Route path="/:alias/:fbId" name="DetailFeedPage" component={DetailFeedPage} />
                    </Switch>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
