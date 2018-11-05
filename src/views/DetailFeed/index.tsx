import React from 'react';
import GroupQuery from '../../components/GroupQuery';
import Container from './Container';


class DetailFeedPage extends React.Component<any> {
    public render() {
        const alias = this.props.match.params.alias;
        return (
            <GroupQuery alias={alias}>
                <Container {...this.props} />
            </GroupQuery>
        )
    }
}

export default DetailFeedPage
