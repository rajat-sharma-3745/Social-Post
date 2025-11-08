import Post from "../models/Post.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

export const getAllPosts = asyncHandler(async (req, res, next) => {
    const { page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit
    const posts = await Post.find().populate('author','name profilePic').populate("comments.user", "name profilePic").sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalPosts = await Post.countDocuments();
    res.status(200).json({
        message: "Posts fetched successfully",
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        posts,
    });
})


export const createPost = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    const author = req.user._id;
    const image = req?.file ? await uploadFileToCloudinary(req.file) : "";

    if (!text && !image) {
        return next(new ApiError("Post must contain text or image", 400))
    }
    const post = await Post.create({
        author,
        text,
        image,
    });
    const populatedPost = await post.populate('author', 'name profilePic');

    res.status(201).json({
        message: "Post created successfully",
        post:populatedPost,
    });

})

export const likePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(id);
    if (!post) {
        return next(new ApiError('Post not found', 400))
    }
    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
        post.likes = post.likes.filter((id) => id.toString() !== userId.toString())
    } else {
        post.likes.push(userId)

    }
    await post.save();
    res.status(200).json({
        success: true,
        message: alreadyLiked ? "Post unliked" : "Post liked",
        totalLikes: post.likes.length,
        post,
    });
})

export const commentOnPost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user._id;
    if (!text || text.trim() === "") {
        return next(new ApiError("Comment text is required", 400));
    }
    const post = await Post.findById(id);
    if (!post) {
        return next(new ApiError('Post not found', 400))
    }
    post.comments.push({ text, user: userId })
    await post.save()
    const updatedPost = await Post.findById(id)
        .populate("author", "name profilePic")
        .populate("comments.user", "name profilePic");

    res.status(201).json({
        success: true,
        message: "Comment added successfully",
        commentsCount: updatedPost.comments.length,
        comments: updatedPost?.comments,
    });

})