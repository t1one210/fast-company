import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.services";
import { toast } from "react-toastify";

const ProfessionContent = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContent);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <ProfessionContent.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContent.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
