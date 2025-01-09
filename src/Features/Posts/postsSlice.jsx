import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch posts for a specific subreddit
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subreddit = 'popular') => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const data = await response.json();
  return data.data.children.map((child) => child.data);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
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
