import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts('reactjs')); // Fetch posts from the 'reactjs' subreddit
      }, [dispatch]);
  
    if (postStatus === 'loading') return <p>Loading...</p>;
    if (postStatus === 'failed') return <p>Error: {error}</p>; 

    return (
        <div>
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
export default PostsList;