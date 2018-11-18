// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types'
import React from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';

import {
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,

} from 'reactstrap';
import Container from 'reactstrap/lib/Container';



class NavbarComponent extends React.PureComponent<any, any> {
    public static contextTypes = {
        router: PropTypes.object, // replace with PropTypes.object if you use them
    }
    constructor(props: any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    public toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public logout = () => {
        this.props.client.clearStore();
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    public render() {
        return (
            <div>
                <Navbar expand="md" fixed={`top`}>
                    <Container>
                        <Link onClick={this.context.router.history.goBack} to="#" style={{paddingRight: '12px'}}>
                            <FontAwesomeIcon icon="arrow-left" style={{ color: 'white' }} />
                        </Link>
                        <NavbarBrand href={`/${this.props.group.alias}`}>
                            {this.props.group.name}
                        </NavbarBrand>
                        <NavbarToggler className="navbar-dark" onClick={this.toggle} />

                        <Collapse isOpen={this.state.isOpen} navbar={true}>
                            <Col md={5} style={{ padding: '0px' }}><Input placeholder="search" style={{ height: '26px', fontSize: '14px' }} /></Col>
                            <Nav className="ml-auto" navbar={true}>
                                <UncontrolledDropdown nav={true} inNavbar={true}>
                                    <DropdownToggle nav={true} caret={true} />
                                    <DropdownMenu right={true}>
                                        <DropdownItem>
                                            Cài đặt
                                        </DropdownItem>
                                        <DropdownItem onClick={this.logout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default withApollo(NavbarComponent);
