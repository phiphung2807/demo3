import { createSlice } from "@reduxjs/toolkit";
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from "../../actions/post";
import { IPost } from "../../interface/Post";

const initialState = {
    posts: [],
    isLoading: false,
    error: ''
} as { posts: any, isLoading: boolean, error: string };

export const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // GET ALL
        builder.addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        })
        builder.addCase(getAllPosts.rejected, (state) => {
            state.isLoading = false;
        })

        // ADD
        builder.addCase(addPost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts.push(action.payload);
        })
        builder.addCase(addPost.rejected, (state) => {
            state.isLoading = false;
        })

        // Update
        builder.addCase(updatePost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.isLoading = false;
            const updatedPost = action.payload;
            state.posts = state.posts.map((item: IPost) => (item._id === updatedPost._id ? updatedPost : item));
        })
        builder.addCase(updatePost.rejected, (state) => {
            state.isLoading = false;
        })

        // Delete
        builder.addCase(deletePost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedPostId = action.payload.post._id;
            state.posts = state.posts.filter((item: IPost) => item._id !== deletedPostId);
        })
        builder.addCase(deletePost.rejected, (state) => {
            state.isLoading = false;
        })

        // Get post by id
        builder.addCase(getPostById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        })
        builder.addCase(getPostById.rejected, (state) => {
            state.isLoading = false;
        })
    },
});

export const PostReducer = PostSlice.reducer;
