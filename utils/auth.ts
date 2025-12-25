import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDb } from "@/utils/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        console.log("---------------- credentials", credentials);

        // 从 MongoDB 查询用户
        const db = await getDb();
        const user = await db.collection("users").findOne({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          return null;
        }

        // 返回用户信息（不包含密码）
        // id 字段是 NextAuth 必须的，_id 是我们自定义的字段
        const userId = user._id.toString();
        return {
          id: userId, // NextAuth 标准字段（必须）
          _id: userId, // 自定义字段，统一使用 _id
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // NextAuth 必须字段
        token._id = (user as any)._id || user.id; // 统一使用 _id
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // NextAuth 必须字段
        (session.user as any)._id = token._id as string; // 统一使用 _id
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
});
