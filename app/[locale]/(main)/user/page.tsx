// app/user/about/page.tsx
import UserInfo from "./UserInfo";
import Link from "next/link";

export { generateStaticParams } from "@/i18n/request";

export const dynamic = "force-static"; // 强制静态渲染

const Page = () => {
  return (
    <div>
      <h1>User About</h1>
      <UserInfo />
      <Link type="button" href="/user/me" className="btn btn-primary mt-1">
        User Me
      </Link>
    </div>
  );
};

export default Page;
