import { cookies } from "next/headers";

export const GET = async (req: Request, { params }) => {
  // user/:id
  const { id: userId } = await params;

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  // Simulate fetching user data from a database
  const userData = {
    id: userId,
    name: "John Doe",
    email: "999@qq.com",
  };
  // sleep
  await new Promise((resolve) => setTimeout(resolve, 400));

  return new Response(JSON.stringify(userData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
