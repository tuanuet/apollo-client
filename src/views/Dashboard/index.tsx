import _ from 'lodash';

import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import FeedList from '../../components/FeedList';
import GroupQuery from '../../components/GroupQuery';
import Navbar from '../../components/NavBar';


class DashboardPage extends React.Component<any> {
    public render() {
        const alias = this.props.match.params.alias;
        return (
            <GroupQuery alias={alias}>
                {(group: any) => {
                    return <Fragment>
                        <Navbar group={group} />
                        <Container style={{ padding: '0px', marginTop: '50px' }}>
                            <FeedList group={group} />
                        </Container>
                    </Fragment>
                }}
            </GroupQuery>
        )
    }
}

export default DashboardPage;
