"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import useLoadMore from "@/hooks/useLoadMore";

async function fetchImages(page: number): Promise<string[]> {
  return Array.from({ length: 9 }, (_, i) => {
    const id = page * 10 + i;
    return `https://picsum.photos/id/${id}/600/400`;
  });
}

export default function ImageStreamPage() {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreImages = useCallback(async () => {
    console.log("Loading more images...");
    const newImages = await fetchImages(page);
    setImages((prev) => [...prev, ...newImages]);
    setPage((prev) => prev + 1);
  }, [page]);

  const { loading, loaderRef } = useLoadMore(loadMoreImages);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-[1400px] mx-auto">
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ImageWithSkeleton src={src} alt={`Image ${idx}`} />
        </motion.div>
      ))}
      <div ref={loaderRef} className="h-12 col-span-full text-center">
        {loading && <span>loading...</span>}
      </div>
    </div>
  );
}
