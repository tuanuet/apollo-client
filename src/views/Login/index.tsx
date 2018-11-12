// tslint:disable:no-console
import gql from "graphql-tag";
import _ from 'lodash';
import React from 'react';
import { compose, graphql } from 'react-apollo';

import { Link } from 'react-router-dom'
import {
    Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row
} from 'reactstrap';
import { pure, withHandlers, withState } from 'recompose';

export const LOGIN_GET_TOKEN = gql`
mutation GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
        success
        token
        message
    }
}
`;

const LoginPage = (props: any) => {
    return (
        <Row className="d-flex justify-content-center" >
            <Col md={8}>
                <Card>
                    {props.error && (
                        <span>
                            Error: {props.error}
                        </span>
                    )}
                    <CardBody>
                        <Form onSubmit={props.submitLogin}>
                            <FormGroup row={true}>
                                <Label for="exampleEmail" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Type your email" onChange={props.onChangeEmail} />
                                </Col>
                            </FormGroup>
                            <FormGroup row={true}>
                                <Label for="examplePassword" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="password" name="password" id="examplePassword" placeholder="Type your password" onChange={props.onChangePassword} />
                                </Col>
                            </FormGroup>

                            <FormGroup check={true} row={true}>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button onClick={props.submitLogin}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default compose(
    graphql(LOGIN_GET_TOKEN, {
        name: "getTokenQuery"
    }),
    withState('email', 'setEmail', ''),
    withHandlers<any, any>({
        onChangeEmail: (props: any) => (event: any) => {
            props.setEmail(event.target.value)
        },
    }),
    withState('password', 'setPassword', ''),
    withState('error', 'setError', ''),
    withHandlers({
        onChangePassword: (props: any) => (event: any) => {
            props.setPassword(event.target.value)
        }
    }),
    withHandlers({
        submitLogin: (props: any) => (event: any) => {
            event.preventDefault();
            props.getTokenQuery({
                variables: {
                    email: props.email,
                    password: props.password
                }
            }).then(({data}: any) => {
                if (data && data.getToken && data.getToken.token) {
                    localStorage.setItem('token', data.getToken.token);
                    props.history.push(`/`);
                } else {
                    props.setError(data.getToken.message)
                }
            });
        }
    }),
    pure
)(LoginPage);
