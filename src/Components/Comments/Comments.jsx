import { fetchComments } from "../../Features/Comments/commentsSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import React from 'react'
  
  function Comments({post}) {
    const [visibleComments, setVisibleComments] = useState({});
    const comments = useSelector((state) => state.comments);

    return (
        <div className = "comments">
            {visibleComments[post.id] && comments[post.permalink]?.loading && <p>Loading comments...</p>}
            {visibleComments[post.id] && comments[post.permalink]?.data && (
            <ul>
                {comments[post.permalink].data.map((comment) => (
                <li key={comment.id}>
                    <strong>{comment.author}</strong>: {comment.body}
                </li>
                ))}
            </ul>
            )}
            {visibleComments[post.id] && comments[post.permalink]?.error && <p>Error loading comments.</p>}
      </div>
    )
  }
  
export default Comments;