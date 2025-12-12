"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const session = useSession();
  console.log("session", session);

  return (
    <div>
      <h2>Name: {session.data?.user?.name}</h2>
      <p>Email: {session.data?.user?.email}</p>
    </div>
  );
};

export default UserInfo;
