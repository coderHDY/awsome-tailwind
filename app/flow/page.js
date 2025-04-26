// components/FlowEditor.tsx
"use client";
import FlowEditor from "@/components/FlowEditor";
// app/flow/page.tsx
import dynamic from "next/dynamic";

export default function FlowPage() {
  return (
    <div className="w-full h-screen">
      <FlowEditor />
    </div>
  );
}
