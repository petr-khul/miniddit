import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="topbar">
            <img src="../src/Components/Navbar/reddit_logo.png" className="logo"></img>
            <form>
                <input type="text" 
                    className="searchBar"
                    placeholder="What are you searching for...?" >
                </input>
                <button type="submit" 
                    className="submitButton">
                        <img src="../src/Components/Navbar/search_icon.png" />
                </button>
            </form>
        </div>
    );
}

export default Navbar;
