import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { branch, renderComponent } from 'recompose';

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
    <div className="d-flex justify-content-center p-2"><FontAwesomeIcon icon="circle-notch" spin={true}/></div>
)
