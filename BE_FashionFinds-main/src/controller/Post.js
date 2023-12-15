import Post from "../model/Post";
import joi from "joi";
import { PostSchema, PostSchemaUpdate } from "../schemas/Post";

export const createPost = async (req, res) => {
  const { post_name, post_images, post_content } = req.body;

  try {
    // Validate request data
    const { error } = PostSchema.validate({ post_name, post_images, post_content });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Create a new post
    const post = await Post.create({
      post_name,
      post_images,
      post_content,
    });

    return res.json({
      message: "Thêm bài viết thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.json({
      message: "Lấy danh sách bài viết thành công",
      posts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
      });
    }
    return res.json({
      message: "Lấy bài viết thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { post_name, post_images, post_content } = req.body;
  const id = req.params.id;
  const formData = req.body;

  try {
    const { error } = PostSchemaUpdate.validate(formData, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const post = await Post.findByIdAndUpdate(
      id,
      { ...formData },
      {
        new: true,
      }
    );
    if (!post) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
      });
    }
    return res.json({
      message: "Sửa bài viết thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(400).json({
        message: "Không tìm thấy bài viết",
      });
    }

    return res.json({
      message: "Xóa bài viết thành công",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
