import _ from 'lodash';
import React, { Fragment } from 'react';
import FeedList from '../../components/FeedList';
import GroupInfo from '../../components/GroupInfo';
import GroupQuery from '../../components/GroupQuery';

class DashboardPage extends React.Component<any> {

    public render() {        
        const alias = this.props.match.params.alias;
        return (
            <GroupQuery alias={alias}>
                <GroupInfo />
                <FeedList />
            </GroupQuery>
        )
    }
}

export default DashboardPage;
