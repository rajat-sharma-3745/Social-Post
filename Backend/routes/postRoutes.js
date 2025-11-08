import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";
import { commentOnPost, createPost, getAllPosts, likePost } from "../controllers/postController.js";


const router = Router();


router.get('/',auth,getAllPosts);
router.post('/',auth,upload.single('image'),createPost);
router.patch("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentOnPost);


export default router