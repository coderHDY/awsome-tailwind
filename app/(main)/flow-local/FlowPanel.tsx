"use client";

import React, { useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type Item = {
  id: string;
  x: number;
  y: number;
  data?: any;
};

type Link = {
  from: string;
  to: string;
};

type Props = {
  items: Item[];
  setItems: (itemsFunc: any) => void;
  links: Link[];
  renderItem: (item: Item) => React.ReactNode;
};

const FlowPanel: React.FC<Props> = ({
  items,
  setItems,
  links,
  renderItem,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (id: string, deltaX: number, deltaY: number) => {
    setItems((prev: Item[]) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, x: item.x + deltaX, y: item.y + deltaY }
          : item
      )
    );
  };

  const getItemById = (id: string) => items.find((i) => i.id === id);

  return (
    <div
      ref={containerRef}
      className="w-full border relative bg-white dark:bg-neutral-900 overflow-auto"
    >
      <TransformWrapper
        minScale={0.8}
        maxScale={2}
        wheel={{ step: 0.1, smoothStep: 0.01, activationKeys: [] }}
        doubleClick={{ disabled: true }}
        pinch={{ step: 5 }}
      >
        <TransformComponent>
          <div style={{ 
            width: 2000, 
            height: 2000, 
            position: "relative",
            minWidth: "100%",
            minHeight: "1000%"
          }}>
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {links.map((link) => {
                const from = getItemById(link.from);
                const to = getItemById(link.to);
                if (!from || !to) return null;
                const fromX = from.x + 100; // 假设 item 宽度为 200
                const fromY = from.y + 50;
                const toX = to.x;
                const toY = to.y + 50;
                return (
                  <path
                    key={`${link.from}-${link.to}`}
                    d={`M ${fromX},${fromY} C ${fromX + 100},${fromY} ${
                      toX - 100
                    },${toY} ${toX},${toY}`}
                    stroke="gray"
                    strokeWidth={2}
                    fill="none"
                  />
                );
              })}
            </svg>

            {items.map((item) => (
              <DraggableItem key={item.id} item={item} onDrag={handleDrag}>
                {renderItem(item)}
              </DraggableItem>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

function DraggableItem({
  item,
  children,
  onDrag,
}: {
  item: Item;
  children: React.ReactNode;
  onDrag: (id: string, dx: number, dy: number) => void;
}) {
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    onDrag(item.id, dx, dy);
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      className="absolute cursor-move select-none"
      style={{
        left: item.x,
        top: item.y,
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
}

export default FlowPanel;
