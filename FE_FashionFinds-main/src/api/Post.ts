import { IPost } from "../interface/Post";
import { instance } from "./instance";

export const GetAllPosts = () => {
    return instance.get(`/posts`);
}
export const GetPostById = (_id: string) => {
    return instance.get('/posts/' + _id);
}
export const AddPost = (post: IPost) => {
    return instance.post('/posts', post);
}
export const UpdatePost = (post: IPost) => {
    return instance.put(`/posts/${post._id}`, post);
}
export const DeletePost = (_id: string) => {
    return instance.delete(`/posts/` + _id);
}