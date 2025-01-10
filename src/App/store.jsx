import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../Features/Posts/postsSlice";
import commentsReducer from "../Features/Comments/commentsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer
    }
})
