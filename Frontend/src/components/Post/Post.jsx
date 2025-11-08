import React, { useState } from "react";
import styles from "./Post.module.css";
import { MdMoreHoriz, MdOutlineMessage } from "react-icons/md";
import { FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Avatar from "../shared/Avatar";
import { useAppContext } from "../../context/AppContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "sonner";
import Modal from "../shared/Modal";
import Comment from "../Comment/Comment";

const Post = ({ post }) => {
  const { user } = useAppContext();
  const [liked, setLiked] = useState(post?.likes.includes(user?._id) || false);
  let [likeCount, setLikeCount] = useState(post?.likes.length);
  const [commentOpen, setCommentOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);

  const onClose = () => setCommentOpen(false);

  const likeOrDislikeHandler = async () => {
    try {
      const { data } = await axiosInstance.patch(API_PATHS.POST.LIKE(post._id));
      if (data?.success) {
        const updatedLikesCount = liked ? likeCount - 1 : likeCount + 1;
        setLikeCount(updatedLikesCount);
        setLiked((p) => !p);
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const sendCommentHandler = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        API_PATHS.POST.COMMENT(post?._id),
        { text: commentText }
      );
      if (data?.success) {
        toast.success(data?.message);
        setCommentText("");
        setComments(data?.comments);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  function formatTimestamp(time) {
    const date = new Date(time);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${dayName}  ${day}${getOrdinal(
      day
    )} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
  }
  function getOrdinal(n) {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Avatar />
        <div className={styles.userInfo}>
          <h4 className={styles.name}>{post?.author?.name}</h4>
          <p className={styles.date}>{formatTimestamp(post?.createdAt)}</p>
        </div>
      </div>

      <p className={styles.content}>{post?.text}</p>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "6px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {post?.image && (
          <img src={post?.image} alt="post" className={styles.postImage} />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.iconGroup}>
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              style={{ fill: "red", cursor: "pointer" }}
              size={22}
            />
          ) : (
            <FaRegHeart
              style={{ cursor: "pointer" }}
              onClick={likeOrDislikeHandler}
              size={22}
            />
          )}
          <span>{likeCount}</span>
        </div>
        <div className={styles.iconGroup}>
          <MdOutlineMessage
            onClick={() => setCommentOpen((p) => !p)}
            size={18}
          />
          <span>{comments?.length}</span>
        </div>
      </div>
      <Modal
        open={commentOpen}
        onClose={onClose}
        clickOutside={false}
        closeButton={false}
      >
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.commentHeader}>
            <h2 className={styles.title}>Comments</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <RxCross2 size={20} />
            </button>
          </div>

          {/* Comments List */}
          <div className={styles.commentList}>
            {comments.length === 0 ? (
              <p className={styles.noComments}>No comments yet.</p>
            ) : (
              comments.map((c) => <Comment comment={c} />)
            )}
          </div>

          {/* Add Comment */}
          <div className={styles.addComment}>
            <input
              type="text"
              placeholder="Write a comment..."
              className={styles.input}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <button
                onClick={sendCommentHandler}
                className={styles.postButton}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Post;
