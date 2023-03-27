import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = (props) => {
    return (
        <>
            <td style={{ textAlign: "left" }}>{props.name}</td>
            <td>
                {props.qualities.map((quality) => (
                    <Qualitie
                        key={quality._id}
                        color={quality.color}
                        name={quality.name}
                    />
                ))}
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate} /5</td>
            <td>
                <BookMark
                    {...props}
                    status={props.bookmark}
                    onToggleBookMark={props.onToggleBookMark}
                />
            </td>
        </>
    );
};

User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
