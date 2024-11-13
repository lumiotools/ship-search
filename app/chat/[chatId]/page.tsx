"use client";

import React from "react";
import "@xyflow/react/dist/style.css";
import Nodes from "@/app/components/NodesCard";
import AnswerNode from "@/app/components/AnswerNode";
import { ZoomSlider } from "@/components/zoom-slider";

import { Background, BackgroundVariant, Position, ReactFlow } from "@xyflow/react";

const nodeTypes = {
  answerNode: AnswerNode,
  customNode: Nodes,
};

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

export default function ChatPage() {
  const initialNodes = [
    {
      id: "1",
      type: "answerNode",
      position: { x: 250, y: 5 },
      data: { message: "I'm constantly facing pressure to reduce shipping costs while maintaining service levels. Can you come up with a strategy for me and summarize it? I'm using Shipoo platform." },
      ...nodeDefaults
    },
  ];

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={initialNodes}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
      >
        <ZoomSlider />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
