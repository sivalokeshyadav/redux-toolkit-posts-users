import {createSlice} from "@reduxjs/toolkit";
import { fetchingAddUsers, fetchingDeleteUsers, fetchingGetUsers, fetchingUpdateUsers } from "../apis/fetchingUserApis";

const initialState = {
  posts: [],
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchingGetUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingGetUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchingGetUsers.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload.error.message;
      })
      .addCase(fetchingAddUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingAddUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(fetchingAddUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      })
      .addCase(fetchingUpdateUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingUpdateUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        const index=state.posts.findIndex(post=>post.id===action.payload.id)
        if(index!=-1){
            const updatedPost=state.posts[index]
            updatedPost.title=action.payload.title
            state.posts[index]=updatedPost;
          
        }
      })
      .addCase(fetchingUpdateUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      })
      .addCase(fetchingDeleteUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchingDeleteUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post=>post.id!=action.payload);
      })
      .addCase(fetchingDeleteUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      });
  },
});

export default userSlice.reducer;
