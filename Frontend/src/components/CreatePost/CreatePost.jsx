import React, { useRef, useState } from "react";
import styles from "./CreatePost.module.css";
import { IoCamera } from "react-icons/io5";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "sonner";
import { FaPaperPlane } from "react-icons/fa6";

const CreatePost = ({ setPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      setLoading(true);
      const formData = new FormData();
      if (text) formData.append("text", text);
      if (image) formData.append("image", image);
      const { data } = await axiosInstance.post(
        API_PATHS.POST.CREATE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data?.message);
      setPosts((prev) => [data?.post, ...prev]);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while creating post."
      );
    } finally {
      setLoading(false);
      setText("");
      setImagePreview("");
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create Post</h3>
      <textarea
        className={styles.textarea}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {imagePreview && (
        <div
          className=""
          style={{
            width: "100%",
            marginBottom: "0.5rem",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderTop:"1px solid #e5e7eb",
            paddingTop:"10px"
          }}
        >
          <button style={buttonStyle} onClick={() => setImagePreview("")}>
            ×
          </button>
          <img
            src={imagePreview}
            alt="preview_img"
            style={{ objectFit: "contain", width: "100%",height:'300px' }}
          />
        </div>
      )}
      <div className={styles.footer}>
        <button
          onClick={handleClick}
          disabled={imagePreview}
          className={styles.photoButton}
        >
          <input
            type="file"
            ref={imageRef}
            onChange={({ target }) => {
              setImage(target.files[0]);
              setImagePreview(URL.createObjectURL(target.files[0]));
            }}
            style={{ display: "none" }}
          />
          <IoCamera size={18} />
          Photo
        </button>
        <button
          className={`${styles.postButton} ${
            !text.trim() && !imagePreview ? styles.disabled : ""
          }`}
          onClick={handlePost}
          disabled={!text.trim() && !imagePreview}
        >
         {loading?
         <div className={styles.loader}></div>:
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'5px'}}><FaPaperPlane/> Post</div>
         }
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

const buttonStyle = {
  backgroundColor: "#EF4444", // red-500
  color: "#FFFFFF", // white text
  border: "none",
  borderRadius: "50%", // fully rounded
  padding: "5px", // adjust size
  width: "20px",
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "12px",
  position: "absolute",
  top: 5,
  right: "6px",
};
