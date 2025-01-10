import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (permalink, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com${permalink}.json`);
      const data = await response.json();
      const comments = data[1].data.children
        .filter((comment) => comment.kind === 't1')
        .map((comment) => ({
          id: comment.data.id,
          author: comment.data.author,
          body: comment.data.body,
        }));
      return comments;
    } catch (error) {
      return rejectWithValue('Failed to load comments');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state[action.meta.arg] = { loading: true, data: [] };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state[action.meta.arg] = { loading: false, data: action.payload };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state[action.meta.arg] = { loading: false, error: action.payload };
      });
  },
});

export default commentsSlice.reducer;
