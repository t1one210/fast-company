import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    if ((length > 4 && length < 13) || length % 10 === 1) {
        return (
            <span className="badge bg-primary">
                {length} человек тусанет с тобой сегодня
            </span>
        );
    } else if (length % 10 >= 2 && length % 10 <= 4) {
        return (
            <span className="badge bg-primary">
                {length} человека тусанет с тобой сегодня
            </span>
        );
    }
    return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
};

SearchStatus.propTypes = {
    length: PropTypes.number
};

export default SearchStatus;
