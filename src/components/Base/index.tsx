import React from 'react';
import { branch, compose, pure, renderComponent, withState } from 'recompose';

export const renderWhileLoading = (component: any, propName = 'data') =>
    branch(
        props => props[propName] && props[propName].loading,
        renderComponent(component),
    );

export const renderForError = (component: any, propName = "data") =>
    branch(
        props => props[propName] && props[propName].error,
        renderComponent(component),
    );

export const ErrorComponent = (props: any) => (
    <span>
        Something went wrong, you can try f5 to refresh
    </span>
)

export const LoadingComponent = () => (
    <div>Loading.....</div>
)

