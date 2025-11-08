import React, { useEffect, useState } from "react";

import Post from "./Post/Post";

const Feed = ({ posts,containerRef }) => {
  return (
    <div ref={containerRef}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
