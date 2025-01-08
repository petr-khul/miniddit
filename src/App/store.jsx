import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../Features/Posts/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
})
