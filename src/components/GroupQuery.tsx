// tslint:disable:no-console

import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, withApollo} from 'react-apollo';
import { ErrorComponent, LoadingComponent, renderForError, renderWhileLoading, } from './Base';


export const GROUP_SELECTED = gql`
query SelectedGroup ($alias: String!) {
    selectedGroup: getGroupByAlias (alias: $alias) {
        fbId, alias, name, description
    }
}
`
const GroupQuery = (props: any) => {
    const { children, data, client}: any = props;
    client.writeQuery({
        data,
        query: GROUP_SELECTED
    })
    return children(data.selectedGroup)
}

export default compose(
    graphql<any>(GROUP_SELECTED, {
        options: (props: any) => ({
            variables: { alias: props.alias }
        })
    }),
    renderWhileLoading(LoadingComponent),
    renderForError(ErrorComponent),
    withApollo,
)(GroupQuery);
