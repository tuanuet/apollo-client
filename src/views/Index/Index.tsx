import gql from "graphql-tag";
import _ from 'lodash';
import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import {Link} from 'react-router-dom'
import {
    Button, Card, CardLink, CardText, CardTitle, Col, Form, FormGroup, FormText, Input, Label, Row
} from 'reactstrap';
import FormAddGroup from './FormAddGroup';

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

export const CardIndex = (group: IGroup) => {
    const { fbId, description, name, alias } = group;
    return (
        <Col md={4} key={fbId}>
            <Card body={true} inverse={true} color="danger">
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
                <Link to={`/${alias}`}>Vào thôi</Link>
            </Card>
        </Col>
    );
}

class IndexPage extends React.Component {
    public render() {
        return (
            <Fragment>
                <Row className="d-flex justify-content-center">
                    <Query query={GROUPS_QUERY} >
                        {({ loading, error, data, client, updateQuery }) => {

                            if (loading) {
                                return <p>Loading...</p>;
                            }
                            if (error) {
                                return <p>Error :( ${error.message}</p>;
                            }

                            const groups: IGroup[] = data.groups;

                            client.writeData({
                                data: {
                                    groups: _.map(groups, group => ({ ...group, ...{ __typename: 'GroupItem' } }))
                                }
                            })
                            return groups.map(CardIndex);
                        }}
                    </Query>
                </Row>
                <FormAddGroup />
            </Fragment>

        );
    }
}

export default IndexPage;
