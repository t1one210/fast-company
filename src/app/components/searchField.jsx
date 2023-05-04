import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchField = ({ users }) => {
    const [searchUser, setSearchUser] = useState("");
    console.log(users);

    const search = users.filter((user) => {
        return user.name.toLowerCase().includes(searchUser.toLocaleLowerCase());
    });
    console.log(search);
    const handleChange = (e) => {
        setSearchUser(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Search" onChange={handleChange} />
        </form>
    );
};

SearchField.propTypes = {
    users: PropTypes.array
};

export default SearchField;
