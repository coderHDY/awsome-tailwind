import FlowEditor from "./FlowEditor";
export { generateStaticParams } from "@/i18n/request";

export const dynamic = "force-static"; // 强制静态渲染

export default function FlowPage() {
  return (
    <div className="w-full h-screen">
      <FlowEditor />
    </div>
  );
}
