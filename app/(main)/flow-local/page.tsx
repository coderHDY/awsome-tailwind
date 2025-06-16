"use client";
import FlowPanel from "./FlowPanel";
import { useState } from "react";

const initItems = [
  { id: "1", x: 100, y: 100, data: { name: "节点A" } },
  { id: "2", x: 400, y: 200, data: { name: "节点B" } },
  { id: "3", x: 200, y: 400, data: { name: "节点C" } },
];
const initLinks = [
  { from: "1", to: "2" },
  { from: "1", to: "3" },
];

// 检查两个节点是否重叠
const isOverlapping = (node1: any, node2: any) => {
  const nodeWidth = 192; // w-48 = 12rem = 192px
  const nodeHeight = 80; // h-20 = 5rem = 80px
  const padding = 20; // 节点之间的最小间距

  return !(
    node1.x + nodeWidth + padding < node2.x ||
    node2.x + nodeWidth + padding < node1.x ||
    node1.y + nodeHeight + padding < node2.y ||
    node2.y + nodeHeight + padding < node1.y
  );
};

// 找到合适的位置
const findAvailablePosition = (fromItem: any, existingItems: any[]) => {
  const nodeWidth = 192;
  const nodeHeight = 80;
  const padding = 20;
  const maxAttempts = 8; // 尝试8个方向

  // 定义8个可能的方向
  const directions = [
    { dx: 1, dy: 0 },   // 右
    { dx: 1, dy: 1 },   // 右下
    { dx: 0, dy: 1 },   // 下
    { dx: -1, dy: 1 },  // 左下
    { dx: -1, dy: 0 },  // 左
    { dx: -1, dy: -1 }, // 左上
    { dx: 0, dy: -1 },  // 上
    { dx: 1, dy: -1 },  // 右上
  ];

  for (let i = 0; i < maxAttempts; i++) {
    const direction = directions[i];
    const newX = fromItem.x + direction.dx * (nodeWidth + padding);
    const newY = fromItem.y + direction.dy * (nodeHeight + padding);

    const newItem = { x: newX, y: newY };
    let hasOverlap = false;

    // 检查是否与现有节点重叠
    for (const existingItem of existingItems) {
      if (isOverlapping(newItem, existingItem)) {
        hasOverlap = true;
        break;
      }
    }

    if (!hasOverlap) {
      return { x: newX, y: newY };
    }
  }

  // 如果所有方向都重叠，则使用默认位置
  return { x: fromItem.x + 200, y: fromItem.y + 50 };
};

export default function DemoFlow() {
  const [items, setItems] = useState(initItems);
  const [links, setLinks] = useState(initLinks);

  const addItem = (fromItem: any) => {
    const position = findAvailablePosition(fromItem, items);
    const newItem = {
      id: `new-${items.length + 1}`,
      x: position.x,
      y: position.y,
      data: { name: `节点${items.length + 1}` },
    };
    setItems([...items, newItem]);
    setLinks([...links, { from: fromItem.id, to: newItem.id }]);
  };

  const removeItem = (item: any) => {
    setItems(items.filter((i) => i.id !== item.id));
    setLinks(links.filter((l) => l.from !== item.id && l.to !== item.id));
  };

  const renderItem = (item: any) => (
    <div className="w-48 h-20 bg-blue-100 dark:bg-blue-800 rounded-lg shadow text-center flex items-center justify-center">
      {item.data.name}
      {/* add a item */}
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => addItem(item)}
      >
        add item
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={() => removeItem(item)}
      >
        remove item
      </button>
    </div>
  );

  return (
    <FlowPanel
      items={items}
      setItems={setItems}
      links={links}
      renderItem={renderItem}
    />
  );
}
