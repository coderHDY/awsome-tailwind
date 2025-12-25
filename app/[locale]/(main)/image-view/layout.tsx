import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-44px)] overflow-hidden">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">瀑布流图片性能优化</h1>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
