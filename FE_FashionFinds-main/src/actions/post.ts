import { toast } from 'react-toastify';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../interface/Post";
import { AddPost, DeletePost, GetAllPosts, GetPostById, UpdatePost } from "../api/Post";

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async () => {
        try {
            const { data } = await GetAllPosts();
            const posts = data.posts;   
            console.log(data);
                     
            return posts;
        } catch (error: any) {  
            toast.error(error.response.data.message);
            return error;
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePosts",
    async (_id: string, { rejectWithValue }) => {
        try {
            const { data } = await DeletePost(_id);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error);
        }
    }
);

export const getPostById = createAsyncThunk(
    "posts/getPostsById",
    async (_id: string, { rejectWithValue }) => {
        try {
            const { data } = await GetPostById(_id);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error);
        }
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePosts",
    async (post: IPost, { rejectWithValue }) => {
        try {
            const { data } = await UpdatePost(post);
            toast.success(data.message);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error);
        }
    }
);

export const addPost = createAsyncThunk(
    "posts/addPosts",
    async (post: IPost, { rejectWithValue }) => {
        try {
            const { data } = await AddPost(post);
            toast.success(data.message);
            const postData = data.post;
            return postData;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error);
        }
    }
);
