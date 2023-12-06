import Post from "../models/Post.js";
import User from "../models/User.js";
//Create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, preference } = req.body;

    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      preference,
    });
    await newPost.save();

    let preferencePosts = [];
    let otherPosts = [];

    // Fetch posts based on preference
    if (preference) {
      preferencePosts = await Post.find({ preference: user.preference }).sort({
        createdAt: -1,
      });
    }

    // Fetch remaining posts (excluding preference)
    otherPosts = await Post.find({ preference: { $ne: preference } }).sort({
      createdAt: -1,
    });

    // Concatenate preference posts and other posts
    const allPosts = preferencePosts.concat(otherPosts);

    res.status(201).json(allPosts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//read
export const getFeedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const preference = user.preference;

    let preferencePosts = [];
    let otherPosts = [];

    // Fetch posts based on preference
    if (preference) {
      preferencePosts = await Post.find({ preference }).sort({ createdAt: -1 });
    }

    // Fetch remaining posts (excluding preference)
    otherPosts = await Post.find({ preference: { $ne: preference } }).sort({
      createdAt: -1,
    });

    // Concatenate preference posts and other posts
    const allPosts = preferencePosts.concat(otherPosts);

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//update
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
