import gql from "graphql-tag";
import React from 'react';
import { Query } from 'react-apollo';

const GROUP_INFO = gql`
query GetGroup ($fbId: String!) {
    group(fbId: $fbId) {
        fbId, alias, name, description
    }
}
`

class GroupInfo extends React.PureComponent<any> {
    public render() {
        const { group } = this.props;

        return (
            <div>Đây là group {group.name}: {group.fbId}</div>
        )

    }
}

export default GroupInfo;