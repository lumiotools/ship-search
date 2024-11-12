"use client";

import AnswerNode from "@/app/components/AnswerNode";
import Nodes from "@/app/components/NodesCard";
import React from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  answerNode: AnswerNode,
  customNode: Nodes,
};

export default function ChatPage() {
  const initialNodes = [
    {
      id: "1",
      type: "customNode",
      position: { x: 250, y: 5 },
      data: { message: "Can you summarize a strategy for me?" },
    },
    {
      id: "2",
      type: "answerNode",
      position: { x: 250, y: 200 },
      data: { message: "Here's a strategy to optimize your shipping costs." },
    },
  ];

  return (
<div className="w-full h-screen" style={{ backgroundColor: "#161716" }}>
      <ReactFlow nodes={initialNodes} nodeTypes={nodeTypes} fitView>
        <Background color="#888" gap={16} />
      </ReactFlow>
    </div>
  );
}
