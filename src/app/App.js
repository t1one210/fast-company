import React, {useState} from 'react'
import Users from "./components/users"
import SearchStatus from "./components/searchStatus"
import api from '../app/API'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user !== userId))
    }
    const handleToggleBookMark = (id) => {
        const bookMark = users.map (mark => {
            if (mark._id === id._id) {
                return { ...mark, bookmark: !mark.bookmark }
            }
            return { ...mark, bookmark: mark.bookmark};
        });
        setUsers(bookMark);
    }
    return (
        <div>
            {SearchStatus(users.length)} 
            <table className="table" style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th style={{textAlign: 'left'}}>Имя</th>
                        <th style={{textAlign: 'start'}} scope="col">Качества</th>
                        <th style={{textAlign: 'start'}} scope="col">Профессия</th>
                        <th style={{textAlign: 'start'}} scope="col">Встретился, раз</th>
                        <th style={{textAlign: 'start'}} scope="col">Оценка</th>
                        <th style={{textAlign: 'start'}} scope="col">Избранное</th>
                        <th style={{textAlign: 'start'}} scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr key={user._id}>
                                <Users {...user} onToggleBookMark = {() => handleToggleBookMark(user)}/>
                                <td>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(user)}>Delete</button>
                                </td>
                             </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default App;