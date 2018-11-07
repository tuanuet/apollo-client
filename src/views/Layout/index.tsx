import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import GroupQuery from '../../components/GroupQuery';
import Navbar from '../../components/NavBar';


class DefaultLayout extends React.Component<any>{
    public render() {
        const alias = this.props.match.params.alias;
        const { children }: any = this.props;
        return (
            <GroupQuery alias={alias}>
                <Navbar group={this.props.group} />
                <Container style={{ padding: '0px', marginTop: '50px' }}>
                {(group: any) => children(group)}
                </Container>
            </GroupQuery>
        )
    }
}

export default DefaultLayout;
