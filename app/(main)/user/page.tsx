// app/user/about/page.tsx
import UserInfo from "./UserInfo";

const Page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  return (
    <div>
      <h1>User About</h1>
        <UserInfo />
    </div>
  );
};

export default Page;
