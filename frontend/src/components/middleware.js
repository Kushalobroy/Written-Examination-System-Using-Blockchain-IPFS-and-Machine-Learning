import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const middleware = ({ component: Component, allowedRoles, ...rest }) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userRole = userData ? userData.role : null;

    return (
        <Route {...rest} render={(props) => (
            allowedRoles.includes(userRole) ?
                <Component {...props} /> :
                <Navigate to='/login' />
        )} />
    );
};

export default middleware
