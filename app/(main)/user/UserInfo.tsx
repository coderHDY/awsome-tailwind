// components/UserInfo.tsx
"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserInfo = () => {
  const { data: user, error, isLoading } = useSWR("/api/user/1", fetcher);

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
