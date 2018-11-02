import gql from "graphql-tag";
import _ from 'lodash';
import React from 'react';
import { Query } from "react-apollo";
import {
    Card, CardLink, CardText, CardTitle,
} from 'reactstrap';
import { CardIndex, GROUPS_QUERY, IGroup } from '../Index/Index';

class DashboardPage extends React.Component {
    public render() {
        return(
            <Query query={GROUPS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :( ${error.message}</p>;
                    }

                    const groups: IGroup[] = data.groups;

                    return groups.map(CardIndex);
                }}
            </Query>
        )
    }
}

export default DashboardPage;
