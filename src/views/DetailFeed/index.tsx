import React from 'react';
import { Container as ContainerBootstrap } from 'reactstrap';
import GroupQuery from '../../components/GroupQuery';
import Container from './Container';



class DetailFeedPage extends React.Component<any> {
    public render() {
        const alias = this.props.match.params.alias;
        return (
            <ContainerBootstrap>
                <GroupQuery alias={alias}>
                    <Container {...this.props} />
                </GroupQuery>
            </ContainerBootstrap>
        )
    }
}

export default DetailFeedPage
