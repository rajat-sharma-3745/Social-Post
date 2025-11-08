import React, { useEffect } from "react";

const useInfiniteScrollBottom = (page, setPage, totalPages) => {
  useEffect(() => {
    if (!setPage) return;
    const handleScroll = () => {

      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
        if (page && totalPages && page < totalPages) {
          setPage(page + 1);
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ page, totalPages, setPage]);
};

export default useInfiniteScrollBottom;
