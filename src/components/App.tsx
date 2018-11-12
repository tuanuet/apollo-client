// tslint:disable:no-console
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faCircleNotch, faComment, faGrinAlt, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from "apollo-link-http";
import { withClientState } from 'apollo-link-state';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import { ApolloProvider } from "react-apollo";
import { Route, Router, Switch } from 'react-router-dom';
import DefaultLayout from '../components/Base/DefaultLayout';
import { defaults, resolvers, typeDefs } from '../schemas';
import '../styles/index.css';
import DashboardPage from '../views/Dashboard';
import DetailFeedPage from '../views/DetailFeed';
import IndexPage from '../views/Index/Index';
import LoginPage from '../views/Login';


library.add(faGrinAlt)
library.add(faArrowLeft)
library.add(faCircleNotch)
library.add(faComment)
library.add(faShareAlt)
library.add(faThumbsUp)

export const browserHistory = createBrowserHistory();
const cache = new InMemoryCache({
    cacheRedirects: {
        Query: {
            group: (_: any, args: any, { getCacheKey }) => {
                return getCacheKey({ __typename: 'Group', fbId: args.fbId });
            }
        }
    },
    dataIdFromObject: (object: any) => {
        switch (object.__typename) {
            case 'Group': return `GroupItem:${object.fbId}`;
            case 'Comment': return `CommentItem:${object.fbId}`;
            case 'Feed': return `FeedItem:${object.fbId}`;
            case 'Member': return `MemberItem:${object.fbId}`;
            case 'Reaction': return `ReactionItem:${object.id}`;
            default: return defaultDataIdFromObject(object);

        }
    },

});

const stateLink = withClientState({
    // cache,
    defaults,
    resolvers,
    typeDefs
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        }
    }
});


const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });
const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink]).concat(authLink.concat(httpLink))
});


class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <Router history={browserHistory}>
                    <Switch>
                        <Route exact={true} path="/" name="Index" component={IndexPage} />
                        <Route exact={true} path="/login" name="Index" component={LoginPage} />
                        <DefaultLayout exact={true} path="/:alias" component={DashboardPage} />
                        <DefaultLayout exact={true} path="/:alias/:fbId" component={DetailFeedPage} />

                        {/* <Route exact={true} path="/:alias" name="Group" component={DashboardPage} />
                        <Route path="/:alias/:fbId" name="DetailFeedPage" component={DetailFeedPage} /> */}
                    </Switch>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
