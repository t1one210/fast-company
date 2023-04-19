import React from "react";
import UsersList from "../components/usersList";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import UserPage from "../components/userPage";

const Users = () => {
    const { userId } = useParams();
    return <>{!userId ? <UsersList /> : <UserPage userId={userId} />}</>;
};

export default Users;
