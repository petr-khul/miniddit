import React from 'react';
import { getTimeAgo } from "../../Utils/Utils"; // Ensure correct import
import "./Post.css";

function Post({ post, votes, handleUpvote, handleDownvote, visibleComments, handleToggleComments, comments }) {
  return (
    <div className="post">
      <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
        <h3>{post.title}</h3>
      </a>

      {post.preview && post.preview.images[0]?.source && (
        <img
          src={post.preview.images[0].source.url.replace(/&amp;/g, "&")}
          alt="Post image"
          className="postImage"
        />
      )}

      <div className="postMenu">
        <p>Subreddit: <strong>r/{post.subreddit}</strong></p>
        <p>Author: <span className="author">{post.author}</span></p>

        <p className="commentsNumber">
          <img
            src="./comment.png"
            className="commentImage"
            onClick={() => handleToggleComments(post.id, post.permalink)}
          />
          {post.num_comments}
        </p>

        <p>Posted: <i>{getTimeAgo(post.created_utc)}</i></p>

        <div className="votes">
          <button onClick={() => handleUpvote(post.id)}>
            <img src="./upvote.png" className="voteButtonIcon" />
          </button>
          <p>{votes[post.id] || post.ups}</p>
          <button onClick={() => handleDownvote(post.id)}>
            <img src="./downvote.png" className="voteButtonIcon" />
          </button>
        </div>
      </div>

      {visibleComments[post.id] && (
        <div className="comments">
        {comments[post.permalink]?.loading && <p>Loading comments...</p>}
        {comments[post.permalink]?.error && <p>Error loading comments.</p>}
        {comments[post.permalink]?.data && (
            <ul>
            {comments[post.permalink].data.map((comment) => (
                <li key={comment.id}>
                <strong>{comment.author}</strong>: {comment.body}
                </li>
            ))}
            </ul>
        )}
        </div>
      )}
    </div>
  );
}

export default Post;
