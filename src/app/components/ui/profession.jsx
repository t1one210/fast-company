import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const getProfession = useSelector(getProfessions());
    console.log(getProfession);
    const profId = getProfession.find((p) => p._id === id);
    const isLoading = useSelector(getProfessionsLoadingStatus());

    if (!isLoading) {
        return <p>{profId.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
