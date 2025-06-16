/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    data: { label: "开始", description: "这是起点", image: "" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

function CustomNode({ id, data }) {
  const { getNode, getNodes, setNodes, setEdges } = useReactFlow();

  const handleAddNode = () => {
    const parentNode = getNode(id); // 获取当前节点信息
    const siblings = getNodes().filter((n) => n.parentId === id); // 查找已有子节点
    const siblingCount = siblings.length;

    const newNodeId = `${+new Date()}`;
    const newNode = {
      id: newNodeId,
      type: "customNode",
      position: {
        x: parentNode.position.x + parentNode.width, // 右边 250px
        y: parentNode.position.y + siblingCount * 100, // 每个子节点往下 120px
      },
      data: {
        label: "新节点",
        description: "我是新节点",
        image: "https://picsum.photos/id/1083/800/600",
      },
      parentId: id, // 自定义标记父节点（自己加，方便布局用）
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      { id: `e${id}-${newNodeId}`, source: id, target: newNodeId },
    ]);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-2 border border-gray-300 relative w-40">
      <Handle type="target" position={Position.Left} />
      {data.image && (
        <img
          src={data.image}
          alt="node" // 必须加
          width={100} // 要写具体数值，单位px
          height={100}
          className="w-full h-20 object-cover rounded-md" // 样式可以用
        />
      )}
      <div className="text-center font-bold">{data.label}</div>
      <div className="text-xs text-gray-500 text-center">
        {data.description}
      </div>
      <button
        onClick={handleAddNode}
        className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
      >
        +
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = { customNode: CustomNode };

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
