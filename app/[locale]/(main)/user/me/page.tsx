// app/user/about/page.tsx
import UserInfo from "./UserInfo";

export const dynamic = "force-dynamic"; // 强制动态渲染
export { generateStaticParams } from "@/i18n";

const Page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <h1>User About</h1>
      <UserInfo />
    </div>
  );
};

export default Page;
