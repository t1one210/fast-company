import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    const handleClick = () => {
        rest.onToggleBookMark(rest._id);
    };

    const getClasses = () => {
        let classes = "bi bi-star";
        return (classes += rest.bookmark ? "-fill" : "");
    };

    return (
        <>
            <i className={getClasses()} onClick={handleClick}></i>
        </>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
