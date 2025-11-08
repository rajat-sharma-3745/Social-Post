import React from "react";
import { FaUserAlt } from "react-icons/fa";
const Avatar = ({ src, alt, size = "md", style = {} }) => {
  const sizeValues = {
    sm: 24,
    md: 40,
    lg: 56,
    xl: 96,
  };

  const iconSizes = {
    sm: 12,
    md: 20,
    lg: 24,
    xl: 28,
  };
  const containerStyle = {
    width: sizeValues[size],
    height: sizeValues[size],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#E5E7EB", 
    overflow: "hidden",
    ...style,
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: src ? "block" : "none",
  };

  const iconStyle = {
    color: "#6B7280",
    display: src ? "none" : "block",
  };

  return (
    <div style={containerStyle}>
      {src && <img src={src} alt={alt} style={imgStyle} />}
      <FaUserAlt size={iconSizes[size]} style={iconStyle} />
    </div>
  );
};

export default Avatar;
