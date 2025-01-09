import React from 'react'

function Sidebar({ onSelectSubreddit }) {
    const subreddits = [
        "popular", 
        "reactjs", 
        "javascript", 
        "webdev", 
        "programming", 
        "technology", 
    ];
  
  
    return (
        <div style={{ width: "200px", padding: "10px", borderRight: "1px solid #ddd" }}>
          <h3>Popular Subreddits</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {subreddits.map((subreddit) => (
              <li key={subreddit} style={{ marginBottom: "10px" }}>
                <button 
                  onClick={() => onSelectSubreddit(subreddit)} 
                  style={{ padding: "8px", width: "100%", cursor: "pointer" }}
                >
                  r/{subreddit}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default Sidebar