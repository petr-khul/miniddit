import React from "react";

export const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const secondsAgo = Math.floor((now - postDate) / 1000);
  
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
  
    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else {
      return `${daysAgo} days ago`;
    }
};