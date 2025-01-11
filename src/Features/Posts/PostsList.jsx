import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { getTimeAgo } from "../../Utils/Utils";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./PostsList.css";
import { fetchComments } from "../Comments/commentsSlice";
import Post from "../../Components/Post/Post";


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
          <Post
          key={post.id}
          post={post}
          votes={votes}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          comments={comments}
          visibleComments={visibleComments}
          handleToggleComments={handleToggleComments}
        />

        ))}
      </div>
    </div>
  );
};

export default PostsList;
