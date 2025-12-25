import { User } from "@/shared/types/User";
import { NextResponse } from "next/server";
import { auth } from "@/utils/auth";
import { getDb } from "@/utils/db";
import { ObjectId } from "mongodb";

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

    // user/:id (路径参数名为 id，但实际存储的是 MongoDB 的 _id)
    const { id: userIdParam } = await params;

    if (!userIdParam) {
      return NextResponse.json(
        { error: "用户ID无效" },
        { status: 400 }
      );
    }

    // 从 MongoDB 查询用户数据（使用 _id 字段）
    const db = await getDb();
    let user;
    
    // 尝试作为 ObjectId 查询（MongoDB 的 _id）
    try {
      user = await db.collection("users").findOne({
        _id: new ObjectId(userIdParam as string),
      });
    } catch (error) {
      // 如果 ObjectId 无效，返回错误
      return NextResponse.json(
        { error: "用户ID格式无效" },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      );
    }

    // 返回用户信息（不包含密码）
    // 直接使用 MongoDB 的 _id (ObjectId 字符串)
    const userData: User = {
      _id: user._id.toString(),
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
