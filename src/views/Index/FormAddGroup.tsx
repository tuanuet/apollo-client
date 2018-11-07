import gql from "graphql-tag";
import React, { createRef } from 'react';
import { Mutation } from 'react-apollo';
import {
    Button, Col, Form, FormGroup, Input, Label, Row
} from 'reactstrap';
import { GROUPS_QUERY } from './Index';

const GROUP_MUTATION = gql`
    mutation addGroup($fbId: String!, $alias: String!, $name: String!, $description: String!) {
        addGroup(fbId: $fbId, alias: $alias, name: $name, description: $description) @client {
            fbId, alias, name, description
        }
    }
`;

class FormAddGroup extends React.Component {

    private fbId = createRef<HTMLDivElement>()
    private alias = createRef<HTMLDivElement>()
    private description = createRef<HTMLDivElement>()
    private name = createRef<HTMLDivElement>()

    public clickAdd = (addGroup: (args: any) => any) => {
        const alias: any = this.alias;
        const description: any = this.description;
        const fbId: any = this.fbId;
        const name: any = this.name;

        addGroup({
            variables: {
                alias: alias.focus(),
                description: description.focus(),
                fbId: fbId.focus(),
                name: name.focus(),
            }
        })
    }

    public handleAdd = (cache: any, response: any) => {
        // const { groups } = cache.readQuery({ query: GROUPS_QUERY });

        // const group = response.data.addGroup;
        // const newGroup = {
        //     ...group,
        //     __typename: 'Group',
        // };
        // cache.writeQuery({
        //     data: { groups: groups.concat([newGroup]) },
        //     query: GROUPS_QUERY
        // });
    }

    public render() {
        return (
            <Mutation
                mutation={GROUP_MUTATION}
                update={this.handleAdd}
            >
                {addGroup => {
                    return (
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="groupId">GroupId (*)</Label>
                                        <Input type="text" placeholder="GroupId" ref={(value: any) => { this.fbId = value }} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Group Name</Label>
                                        <Input type="text" placeholder="Group name" ref={(value: any) => { this.name = value }} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="text" placeholder="description" ref={(value: any) => { this.description = value }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="alias">Description</Label>
                                <Input type="text" placeholder="alias" ref={(value: any) => { this.alias = value }} />
                            </FormGroup>
                            <Button onClick={this.clickAdd.bind(this, addGroup)}>+ Add Group</Button>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default FormAddGroup;
