import React, { useEffect, useRef } from "react";

const Modal = ({ open, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!open) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 51,
    padding:"10px"
  };

  const modalStyle = {
    backgroundColor: "#fff",
    display: "flex",
    overflow: "hidden",
    borderRadius: "0.5rem",
    boxShadow: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
    position: "relative",
   
 
  };

 

  return (
    <div style={overlayStyle}>
      <div ref={modalRef} style={modalStyle}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
