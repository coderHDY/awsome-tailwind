// app/user/about/page.tsx
import UserInfo from "./UserInfo";

export { generateStaticParams } from "@/i18n";

export const dynamic = "force-static"; // 强制静态渲染

const Page = () => {
  return (
    <div>
      <h1>User About</h1>
      <UserInfo />
    </div>
  );
};

export default Page;
