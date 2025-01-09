import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Navbar.css";
import { fetchPosts } from "../../Features/Posts/postsSlice";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      dispatch(fetchPosts(searchTerm));  // Dispatch search action with the input value
      setSearchTerm("");
    }
  };

  return (
    <div className="topbar">
      <img src="./src/Components/Navbar/reddit_logo.png" className="logo" alt="Reddit logo" />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="searchBar"
          placeholder="Search subreddit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="submitButton">
          <img src="./src/Components/Navbar/search_icon.png" alt="Search icon" className="searchIcon" />
        </button>
      </form>
    </div>
  );
}

export default Navbar;
