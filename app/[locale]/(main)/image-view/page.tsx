"use client";
import { useState, useCallback } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import useLoadMore from "@/hooks/useLoadMore";

// export const metadata = {
//   title: "Image Stream",
//   description: "Infinite scroll image stream",
// };
// export const dynamic = "force-dynamic"; // 让页面每次都重新渲染
// export const revalidate = 0; // 让页面每次都重新渲染
// export const runtime = "edge"; // 让页面在边缘计算上运行
// export const fetchCache = "force-no-store"; // 让页面每次都重新渲染

// export const revalidateTag = "image-stream"; // 让页面每次都重新渲染
// export const revalidateTagConfig = {
//   revalidateTag: "image-stream",
//   revalidateTagConfig: {
//     revalidateTag: "image-stream",
//     revalidateTagConfig: {
//       revalidateTag: "image-stream",
//       revalidateTagConfig: {
//         revalidateTag: "image-stream",
//       },
//     },
//   },
// };
// export const runtimeConfig = {
//   runtime: "edge",
//   fetchCache: "force-no-store",
// };

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
        <ImageWithSkeleton key={idx} src={src} alt={`Image ${idx}`} />
      ))}
      <div ref={loaderRef} className="h-12 col-span-full text-center">
        {loading && <span>loading...</span>}
      </div>
    </div>
  );
}
