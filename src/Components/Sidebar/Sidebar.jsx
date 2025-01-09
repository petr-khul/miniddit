import React from 'react'
import "./Sidebar.css";

function Sidebar({ onSelectSubreddit }) {
    const subreddits = [
        "popular", 
        "reactjs", 
        "javascript", 
        "webdev", 
        "programming", 
        "technology", 
        "html", 
        "css", 
        "codecademy"
    ];
  
  
    return (
        <div className="sidebar">
          <h3>Popular Subreddits</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {subreddits.map((subreddit) => (
              <li key={subreddit} style={{ marginBottom: "10px" }}>
                <button 
                  onClick={() => onSelectSubreddit(subreddit)} 
                  className="subredditButton"
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