import React from "react";

export const metadata = {
  title: "Image Stream",
  description: "Infinite scroll image stream",
};
export const dynamic = "force-dynamic"; // 让页面每次都重新渲染
export const revalidate = 0; // 让页面每次都重新渲染
export const runtime = "edge"; // 让页面在边缘计算上运行
export const fetchCache = "force-no-store"; // 让页面每次都重新渲染

export const runtimeConfig = {
  runtime: "edge",
  fetchCache: "force-no-store",
};
export const revalidateTag = "image-stream"; // 让页面每次都重新渲染
export const revalidateTagConfig = {
  revalidateTag: "image-stream",
  revalidateTagConfig: {
    revalidateTag: "image-stream",
    revalidateTagConfig: {
      revalidateTag: "image-stream",
      revalidateTagConfig: {
        revalidateTag: "image-stream",
      },
    },
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Home</h1>
      </header>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
