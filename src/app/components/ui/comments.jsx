import React, { useEffect, useState } from "react";
import api from "../../API";
import { orderBy } from "lodash";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AddCommentForm from "../common/comment/addCommentForm";
import CommentsList from "../common/comment/commentsList";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleAdd = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemove = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((comment) => comment._id !== id));
        });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                        <AddCommentForm onSubmit={handleAdd} />
                    </div>
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
