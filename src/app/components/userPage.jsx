import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../API";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [getUserById, setUserById] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUserById(data));
    }, []);
    console.log(getUserById);
    const handleReturn = () => {
        history.push("/users");
    };
    return (
        <>
            {getUserById
                ? (
                    <>
                        <h1>{getUserById.name}</h1>
                        <h1>Профессия: {getUserById.profession.name}</h1>
                        <QualitiesList qualities={getUserById.qualities} />
                        <h3>completedMeetings: {getUserById.completedMeetings}</h3>
                        <h2>Rate: {getUserById.rate}</h2>
                        <br />
                        <button
                            onClick={() => {
                                handleReturn();
                            }}
                        >
                            Все Пользователи
                        </button>
                    </>
                )
                : (
                    "Loading"
                )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
