import React, { useEffect, useState } from "react";

import Post from "./Post/Post";

const Feed = ({ posts, containerRef }) => {
  return (
    <div ref={containerRef}>
      {posts?.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <div
          style={{ textAlign: "center", paddingBlock: "32px", color: "gray" }}
        >
          No posts available.
        </div>
      )}
    </div>
  );
};

export default Feed;
