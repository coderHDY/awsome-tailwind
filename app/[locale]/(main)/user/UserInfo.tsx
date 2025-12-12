"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { UserResponse } from "@/shared/types/User";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const res = await fetch("/api/user/1");
    const { data }: UserResponse = await res.json();
    console.log("data", data);
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load user</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserInfo;
