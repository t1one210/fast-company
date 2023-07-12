import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <h1>LogOut</h1>;
};

export default LogOut;
<h1>LogOut</h1>;