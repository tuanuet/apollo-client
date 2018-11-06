// tslint:disable:no-console
import gql from "graphql-tag";
import _ from 'lodash';
import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom'
import {
    Button, Card, CardLink, CardText, CardTitle, Col, Form, FormGroup, FormText, Input, Label, Row
} from 'reactstrap';
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

class IndexPage extends React.Component {
    public render() {

        return (
            <Fragment>
                <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                    <Query query={GROUPS_QUERY} >
                        {({ loading, error, data, client, updateQuery }) => {

                            if (loading) {
                                return <p>Loading...</p>;
                            }
                            if (error) {
                                return <p>Error :( ${error.message}</p>;
                            }

                            const groups: IGroup[] = data.groups;
                            return groups.map(group => CardIndex(group, client));
                        }}
                    </Query>
                </div>
                {/* <FormAddGroup /> */}
            </Fragment>

        );
    }
}

export default IndexPage;
