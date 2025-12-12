import { User } from "@/shared/types/User";
import { NextResponse } from "next/server";
import { auth } from "@/utils/auth";
import { testUsers } from "@/utils/testUser";

export const GET = async (req: Request, { params }) => {
  try {
    // 验证用户是否已登录
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "未授权，请先登录" },
        { status: 401 }
      );
    }

    // user/:id
    const { id: userId } = await params;
    const userIdNum = parseInt(userId as string, 10);

    if (!userId || isNaN(userIdNum)) {
      return NextResponse.json(
        { error: "用户ID无效" },
        { status: 400 }
      );
    }

    // 从 testUser.js 查询用户数据
    const user = testUsers.find((u) => u.id === userIdNum);

    if (!user) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      );
    }

    // 返回用户信息（不包含密码）
    const userData: User = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // sleep
    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json(
      { data: userData },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    );
  }
};
