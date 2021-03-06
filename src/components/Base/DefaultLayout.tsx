import React, { Fragment } from 'react';
import { Route } from 'react-router';
import Navbar from '../../components/NavBar';
import GroupQuery from '../GroupQuery';

export default ({ component: Component, ...rest }: any) => {
    const wrapRender = (matchProps: any) => (
        <GroupQuery alias={matchProps.match.params.alias}>
            {(group: any) => {
                return (<Fragment>
                    <Navbar group={group} {...matchProps} />
                    <div style={{ padding: '0px', marginTop: '50px' }}>
                        <Component group={group} {...matchProps} />
                    </div>
                </Fragment>)
            }}
        </GroupQuery>
    )

    return (
        <Route {...rest} render={wrapRender} />
    )
};
