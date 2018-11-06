import _ from 'lodash';
import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import FeedList from '../../components/FeedList';
import GroupInfo from '../../components/GroupInfo';
import GroupQuery from '../../components/GroupQuery';


class DashboardPage extends React.Component<any> {

    public render() {
        const alias = this.props.match.params.alias;
        return (
            <Container style={{ background: '#e9ebee' }}>
                <GroupQuery alias={alias}>
                    {(group: any) => {
                        return <Fragment>
                            <GroupInfo group={group} />
                            <FeedList group={group} />
                        </Fragment>
                    }}
                </GroupQuery>
            </Container>

        )
    }
}

export default DashboardPage;
