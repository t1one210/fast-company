import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    return (
        <>
            <User {...rest} />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.object
};

export default Users;
