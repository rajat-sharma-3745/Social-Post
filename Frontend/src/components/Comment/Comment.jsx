import React from "react";
import Avatar from "../shared/Avatar";
import moment from 'moment'

const Comment = ({ comment }) => {
  const containerStyle = {
    marginTop: "0.75rem",   // my-3 = 0.75rem top and bottom
    marginBottom: "0.75rem",
  };

  const innerContainerStyle = {
    display: "flex",        
    gap: "0.75rem",        
    // alignItems: "center",   
  };

  const usernameStyle = {
    fontWeight: 600,     
    fontSize: "13px",   
  };

  const textStyle = {
    fontWeight: 400, 
    fontSize:'14px',       
    // paddingLeft: "0.25rem", 
    wordBreak: "break-word" 
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <Avatar size="md" src={comment?.user?.profilePic} />
        <div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <h1 style={usernameStyle}>
          {comment?.user?.name}
        </h1> 
        <p style={{fontSize:'12px',fontWeight:'400'}}>{moment(comment?.createdAt).fromNow()}</p>
        </div>
          <span style={textStyle}> {comment?.text}</span>
          </div>
      </div>
    </div>
  );
};

export default Comment;
