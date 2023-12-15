import express from "express";

import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
} from "../controller/Post";
import { authorization } from "../middleware/Authorization";
import { authenticate } from "../middleware/Authenticate";

const router = express.Router();
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", authenticate, authorization, createPost);
router.delete("/posts/:id", authenticate, authorization, deletePost);
router.put("/posts/:id", authenticate, authorization, updatePost);

export default router;
