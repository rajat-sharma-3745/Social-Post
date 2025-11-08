import React, { useEffect, useState } from "react";

import Post from "./Post/Post";

const Feed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
