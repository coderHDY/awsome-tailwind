"use client"; // 确保这是一个客户端组件

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/${userId}`);
      const { data } = await res.json();
      console.log("data", data);
      setUser(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load user</p>;

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default UserInfo;
