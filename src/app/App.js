import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "../app/API";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const bookMark = users.map((mark) => {
            if (mark._id === id) {
                return { ...mark, bookmark: !mark.bookmark };
            }
            return mark;
        });
        setUsers(bookMark);
    };
    return (
        <div>
            <Users
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                users={users}
            />
        </div>
    );
}

export default App;
