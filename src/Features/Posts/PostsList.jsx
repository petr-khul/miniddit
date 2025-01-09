import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { getTimeAgo } from "../../Utils/Utils";
import Sidebar from "../../Components/Sidebar/Sidebar";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [votes, setVotes] = useState({}); // Combined upvote/downvote state
  const [selectedSubreddit, setSelectedSubreddit] = useState("popular");

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));  // Fetch posts for selected subreddit
  }, [dispatch, selectedSubreddit]);

  useEffect(() => {
    const initialVotes = {};
    posts.forEach((post) => {
      initialVotes[post.id] = post.ups; // Initialize with current vote count
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
    setSelectedSubreddit(subreddit);  // Update subreddit selection
  };

  if (postStatus === "loading") return <p>Loading...</p>;
  if (postStatus === "failed") return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar onSelectSubreddit={handleSelectSubreddit} />

      {/* Posts List */}
      <div style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>
        <h2>Posts from r/{selectedSubreddit}</h2>
        {posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            {/* Thumbnail Image */}
            {post.thumbnail && post.thumbnail !== "self" && post.thumbnail !== "default" ? (
              <img src={post.thumbnail} alt="Post thumbnail" style={{ width: "70px", marginRight: "10px" }} />
            ) : null}

            {/* Title */}
            <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
              <h3>{post.title}</h3>
            </a>

            {/* Additional Details */}
            <p>Subreddit: r/{post.subreddit}</p>
            <p>Author: {post.author}</p>
            <p>Comments: {post.num_comments}</p>
            <p>Votes: {votes[post.id] || post.ups}</p>
            <button onClick={() => handleUpvote(post.id)}>Upvote</button>
            <button onClick={() => handleDownvote(post.id)}>Downvote</button>
            <p>Posted: {getTimeAgo(post.created_utc)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
