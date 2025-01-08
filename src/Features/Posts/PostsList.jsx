import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const postStatus = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts('redux')); // Fetch posts from the 'reactjs' subreddit
      }, [dispatch]);
  
    if (postStatus === 'loading') return <p>Loading...</p>;
    if (postStatus === 'failed') return <p>Error: {error}</p>; 

    return (
        <div>
          <h2>Posts</h2>
            {posts.map((post) => (
                <div key={post.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                {/* Thumbnail Image */}
                {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' ? (
                <img src={post.thumbnail} alt="Post thumbnail" style={{ width: '70px', marginRight: '10px' }} />
                ) : null}

                {/* Title */}
                <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                <h3>{post.title}</h3>
                </a>

                {/* Additional Details */}
                <p>Subreddit: r/{post.subreddit}</p>
                <p>Author: {post.author}</p>
                <p>Comments: {post.num_comments}</p>
                <p>Upvotes: {post.ups}</p>
            </div>
            ))}
        </div>
      );
    };
    
export default PostsList;