import React from "react";

const BookMark =({ status, ...rest}) => {

    const handleClick = () => {
        rest.onToggleBookMark(rest._id);
    };

    console.log(rest.bookmark)

    const getClasses = () => {
        let classes = "bi bi-star";
        return (classes += rest.bookmark ? "-fill" : "");
    };

    return (
        <>  
            <i className={getClasses()} onClick ={handleClick}></i>
        </>
    )
}

export default BookMark;