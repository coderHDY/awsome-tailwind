import React from "react";

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
