import express from "express";
import { deletePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read
router.get("/", verifyToken, getFeedPosts);

// delete
router.delete("/:id", verifyToken, deletePost);

router.get("/:userId/posts", verifyToken, getUserPosts);

//update
router.patch("/:id/like", verifyToken, likePost);
export default router;
