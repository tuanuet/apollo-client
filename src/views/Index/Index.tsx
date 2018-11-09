// tslint:disable:no-console
import gql from "graphql-tag";
import _ from 'lodash';
import React, { Fragment } from 'react';
import { compose, graphql, Query, withApollo } from 'react-apollo';

import { Link } from 'react-router-dom'
import {
    Card, CardText, CardTitle, Col
} from 'reactstrap';
import { pure } from 'recompose';
import { ErrorComponent, LoadingComponent, renderForError, renderWhileLoading, } from '../../components/Base';
import { GROUP_SELECTED } from '../../components/GroupQuery';


export const GROUPS_QUERY = gql`
{
    groups {
        fbId
        name
        alias
        description
    }
}
`;

export interface IGroup {
    fbId: string;
    name: string;
    alias: string;
    description: string;
}

export const CardIndex = (group: IGroup, client: any) => {
    const { fbId, description, name, alias } = group;
    const cacheSeletedGroup = () => {
        client.writeQuery({
            data: { selectedGroup: group },
            query: GROUP_SELECTED,
            variables: {
                alias: group.alias
            }
        })
    }
    return (
        <Col md={4} key={fbId}>
            <Card body={true} inverse={true} color="danger">
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
                <Link to={`/${alias}`} onClick={cacheSeletedGroup}>Vào thôi</Link>
            </Card>
        </Col>
    );
}

const IndexPage = (props: any) => {
    console.log(props);

    const { data, client } = props;
    const groups: IGroup[] = data.groups;
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            {groups.map(group => CardIndex(group, client))}
        </div >
    );
}

export default compose(
    graphql(GROUPS_QUERY),
    renderWhileLoading(LoadingComponent),
    renderForError(ErrorComponent),
    withApollo,
    pure
)(IndexPage);
