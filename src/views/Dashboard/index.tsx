import _ from 'lodash';
import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import FeedList from '../../components/FeedList';

class DashboardPage extends React.Component<any> {
    public render() {
        return (
            <Container style={{ padding: '0px' }}>
                <FeedList group={this.props.group} />
            </Container>
        )
    }
}

export default DashboardPage;
