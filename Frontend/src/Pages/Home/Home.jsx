import React, { useEffect, useRef, useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";

import Feed from "../../components/Feed";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "sonner";
import Navbar from "../../components/Navbar/Navbar";
import useInfiniteScrollBottom from "../../hooks/useInfiniteScrollBottom";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const containerRef = useRef(null);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(API_PATHS.POST.GET(page));
        setPosts((prev) => {
          // Remove duplicates before appending
          const newPosts = data?.posts || [];
          const uniquePosts = newPosts.filter(
            (p) => !prev.some((old) => old._id === p._id)
          );
          return [...prev, ...uniquePosts];
        });
        setTotalPages(data?.totalPages);
      } catch (error) {
        console.log(error?.response?.data);
      }
      finally{
        setLoading(false)
      }
    }
    getPosts();
  }, [page]);
  useInfiniteScrollBottom(page, setPage, totalPages);
  return (
    <div style={{padding:'10px'}}>
      <Navbar />
      <CreatePost setPosts={setPosts} />
      {loading?<Spinner/>:<Feed containerRef={containerRef} posts={posts} />}
    </div>
  );
};

export default Home;
