import React from "react";
import Qualitie from "./qualitie"
import BookMark from "./bookmark"

const User = (props) => {
    return (
        <>
            <td style={{textAlign: 'left'}}>{props.name}</td>
            <td>{props.qualities.map(quality => (
                    <Qualitie key={quality._id} color = {quality.color} name = {quality.name}/>
                ))}
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate} /5</td>
            <td><BookMark {...props} status={props.bookmark} onToggleBookMark = { props.onToggleBookMark }/></td>
        </>   
    )
}

export default User;