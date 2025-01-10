import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { getTimeAgo } from "../../Utils/Utils";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./PostsList.css";
import { fetchComments } from "../Comments/commentsSlice";



const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [votes, setVotes] = useState({});
  const [selectedSubreddit, setSelectedSubreddit] = useState("popular");
  const [visibleComments, setVisibleComments] = useState({});


  const comments = useSelector((state) => state.comments);


  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  useEffect(() => {
    const initialVotes = {};
    posts.forEach((post) => {
      initialVotes[post.id] = post.ups;
    });
    setVotes(initialVotes);
  }, [posts]);

  const handleUpvote = (postId) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [postId]: prevVotes[postId] + 1,
    }));
  };

  const handleDownvote = (postId) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [postId]: prevVotes[postId] - 1,
    }));
  };

  const handleSelectSubreddit = (subreddit) => {
    setSelectedSubreddit(subreddit);
  };

  const handleLoadComments = (postId, permalink) => {
    if (comments[permalink]?.data) {
      return; // Comments already loaded, no need to fetch again
    }
    dispatch(fetchComments(permalink));
  };
  
  const handleToggleComments = (postId, permalink) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  
    if (!visibleComments[postId] && !comments[permalink]?.data) {
      dispatch(fetchComments(permalink)); // Fetch only if not already loaded
    }
  };
  

  if (postStatus === "loading") return <p>Loading...</p>;
  if (postStatus === "failed") return <p>Error: {error}</p>;

  return (
    <div className="postsListContainer">
      <Sidebar onSelectSubreddit={handleSelectSubreddit} />
      <div className="postsList">
        <h2>Posts from r/{selectedSubreddit}</h2>
        {posts.map((post) => (

          
          <div key={post.id} className="post">
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

              <p>
                <img 
                  src="./comment.png" 
                  className="commentImage" 
                  onClick={() => handleToggleComments(post.id, post.permalink)}/>{post.num_comments}
              </p>

              <p>Posted: {getTimeAgo(post.created_utc)}</p>
              
              <div className="votes">
                <button onClick={() => handleUpvote(post.id)}><img src="./upvote.png" className="voteButtonIcon" /> </button>
                <p>{votes[post.id] || post.ups}</p>
                <button onClick={() => handleDownvote(post.id)}><img src="./downvote.png" className="voteButtonIcon" />  </button>
              </div>
            </div> 

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
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
