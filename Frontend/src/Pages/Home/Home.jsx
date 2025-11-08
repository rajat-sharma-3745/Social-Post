import React, { useEffect, useState } from 'react'
import CreatePost from '../../components/CreatePost/CreatePost'

import Feed from '../../components/Feed'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'sonner';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const [posts,setPosts] = useState([]);
    useEffect(()=>{
        async function getPosts() {
            try {
                const {data} = await axiosInstance.get(API_PATHS.POST.GET)
                setPosts(data?.posts);
                // toast.success(data?.message);
            } catch (error) {
                console.log(error?.response?.data)
            }
        }
        getPosts()
    },[])
  return (
    <div>
      <Navbar/>
      <CreatePost setPosts={setPosts}/>
      <Feed posts={posts}/>
    </div>
  )
}

export default Home