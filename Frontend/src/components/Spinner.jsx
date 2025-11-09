import React from "react";

const Spinner = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "calc(100vh - 20rem)", 
  };

  const spinnerStyle = {
    width: "4rem",               
    height: "4rem",              
    border: "4px solid #60A5FA", 
    borderTopColor: "transparent", 
    borderRadius: "50%",          
    animation: "spin 1s linear infinite", 
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
