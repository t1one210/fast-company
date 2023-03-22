import React from 'react';
import User from './user';

const Users = ({ users, ...rest }) => {
    return (
        <>
            <User {...rest} />
        </>
        
    )
}

export default Users;