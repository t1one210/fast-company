import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "../app/API";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./components/pagination";
import { paginate } from "../app/utils/paginate";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user !== userId));
    };
    const handleToggleBookMark = (id) => {
        const bookMark = users.map((mark) => {
            if (mark._id === id._id) {
                return { ...mark, bookmark: !mark.bookmark };
            }
            return { ...mark, bookmark: mark.bookmark };
        });
        setUsers(bookMark);
    };
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <div>
            {SearchStatus(count)}
            <table className="table" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left" }}>Имя</th>
                        <th style={{ textAlign: "start" }} scope="col">
                            Качества
                        </th>
                        <th style={{ textAlign: "start" }} scope="col">
                            Профессия
                        </th>
                        <th style={{ textAlign: "start" }} scope="col">
                            Встретился, раз
                        </th>
                        <th style={{ textAlign: "start" }} scope="col">
                            Оценка
                        </th>
                        <th style={{ textAlign: "start" }} scope="col">
                            Избранное
                        </th>
                        <th style={{ textAlign: "start" }} scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => {
                        return (
                            <tr key={user._id}>
                                <Users
                                    {...user}
                                    onToggleBookMark={() =>
                                        handleToggleBookMark(user)
                                    }
                                />
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default App;
