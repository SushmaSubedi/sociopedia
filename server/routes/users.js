import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
  deleteUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// delete
router.delete("/:id", verifyToken, deleteUser);

// get all users
router.get("/", verifyToken, getAllUsers);

//update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
export default router;
