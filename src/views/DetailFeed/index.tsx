import gql from "graphql-tag";
import _ from 'lodash';
import React, { Fragment } from 'react';
import CommentList from '../../components/CommentList';
import GroupQuery from '../../components/GroupQuery';

class DetailFeedPage extends React.Component<any> {

    public render() {
        const alias = this.props.match.params.alias;
        return (
            <GroupQuery alias={alias}>
                <CommentList {...this.props}/>
            </GroupQuery>
        )
    }
}

export default DetailFeedPage