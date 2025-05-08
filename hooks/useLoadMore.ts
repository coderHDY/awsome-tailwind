import { useCallback, useEffect, useRef, useState } from "react";

const useLoadMore = (loadMore: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);

  const handleLoadMore = useCallback(async () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setLoading(true);
    await loadMore();
    setLoading(false);
    triggeredRef.current = false;
  }, [loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, handleLoadMore]);

  return {
    loading,
    loaderRef,
  };
};

export default useLoadMore;
