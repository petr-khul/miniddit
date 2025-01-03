import React from "react";
import styles from "../Navbar/Navbar.module.css";

function Navbar() {
    return (
        <div className={styles.topbar}>
            <img src="../src/Navbar/reddit_logo.png" className={styles.logo}></img>
            <form>
                <input type="text" 
                    className={styles.searchBar} 
                    placeholder="What are you searching for...?" >
                </input>
                <button type="submit" 
                    className={styles.submitButton}>
                        <img src="../src/Navbar/search_icon.png" />
                </button>
            </form>
        </div>
    );
}

export default Navbar;
