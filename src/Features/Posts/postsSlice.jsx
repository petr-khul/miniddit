import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [], 
    status: "idle", 
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit) => {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
    return response.data.data.children.map((child) => child.data);
  });

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default postsSlice.reducer;  
