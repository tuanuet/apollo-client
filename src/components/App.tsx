
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from "apollo-link-http";
import { withClientState } from 'apollo-link-state';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import { ApolloProvider } from "react-apollo";
import { Route, Router, Switch } from 'react-router-dom';
import resolvers from '../resolvers';
import '../styles/App.css';
import DashboardPage from '../views/Dashboard';
import IndexPage from '../views/Index/Index';

export const browserHistory = createBrowserHistory();
const cache = new InMemoryCache();

const typeDefs = `
  type Group {
    fbId: String!
    alias: String!
    name: String!
    description: String!
  }

  type Mutation {
    addGroup(fbId: String!, alias: String!, name: String!, alias: description!): Group
  }

  type Query {
    groups: [Group]
  }
`;

const stateLink = withClientState({
    // cache,
    defaults: {
        groups: []
    },
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
                        <Route path="/:alias" name="Group" component={DashboardPage} />
                    </Switch>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
