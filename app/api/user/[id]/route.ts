import { User } from "@/shared/types/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }) => {
  // user/:id
  const { id: userId } = await params;

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  // Simulate fetching user data from a database
  const userData: User = {
    id: userId,
    name: "张三",
    email: "zhangsan@example.com",
  };
  // sleep
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json(
    { data: userData },
    {
      status: 200,
    }
  );
};
