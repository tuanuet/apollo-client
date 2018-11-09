import React from 'react';
import { Container as ContainerBootstrap } from 'reactstrap';
import GroupQuery from '../../components/GroupQuery';
import Container from './Container';



class DetailFeedPage extends React.Component<any> {
    public render() {
        const alias = this.props.match.params.alias;
        return (
            <ContainerBootstrap style={{ padding: '0px' }}>
                <GroupQuery alias={alias}>
                    {(group: any) => {
                        return <Container {...this.props} group={group} />
                    }}
                </GroupQuery>
            </ContainerBootstrap>
        )
    }
}

export default DetailFeedPage
