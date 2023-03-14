import React, {useState} from 'react'
import api from '../API'
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user !== userId))
    }
    const renderPhrase = (number) => {
        if ((number > 4 && number < 13) || number % 10 === 1) { 
            return <span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span>;
          } else if (number % 10 >= 2 && number % 10 <= 4) {
            return <span className="badge bg-primary">{number} человека тусанет с тобой сегодня</span>;            
          }
          return <span className="badge bg-danger">Никто с тобой не тусанет</span>; ;
    }
    return (
        <>
        {renderPhrase(users.length)} 
            <table className="table" style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th style={{textAlign: 'left'}}>Имя</th>
                        <th style={{textAlign: 'start'}} scope="col">Качества</th>
                        <th style={{textAlign: 'start'}} scope="col">Профессия</th>
                        <th style={{textAlign: 'start'}} scope="col">Встретился, раз</th>
                        <th style={{textAlign: 'start'}} scope="col">Оценка</th>
                        <th style={{textAlign: 'start'}} scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users.map(user => {
                            return (
                                <tr key={user._id}>
                                <td style={{textAlign: 'left'}}>{user.name}</td>
                                <td>{user.qualities.map(quality => {
                                    return <span key={quality._id} className={'bagde m-1 bg-' + quality.color}>{quality.name}</span>
                                })}</td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate} /5</td>
                                <td>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(user)}>Delete</button>
                                </td>
                                </tr>
                            )
                            
                        
                    })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Users;