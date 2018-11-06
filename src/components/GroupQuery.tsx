import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

export const GROUP_SELECTED = gql`
query SelectedGroup ($alias: String!) {
    selectedGroup: getGroupByAlias (alias: $alias) {
        fbId, alias, name, description
    }
}
`

export default class GroupQuery extends React.Component<any>{
    public render() {
        const alias = this.props.alias;
        const { children }: any = this.props;

        return (
            <Query
                query={GROUP_SELECTED}
                variables={{ alias }}
            >
                {({ loading, client, data, error }) => {
                    if (loading) {
                        return <div>Loading...</div>
                    }

                    if (error) {
                        return <div>error {error.message}</div>
                    }

                    client.writeQuery({
                        data,
                        query: GROUP_SELECTED
                    })

                    return children(data.selectedGroup)
                }}
            </Query>
        )
    }
}
