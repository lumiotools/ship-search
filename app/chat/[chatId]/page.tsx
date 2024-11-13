"use client";

import React, { useState } from "react";
import "@xyflow/react/dist/style.css";
import Nodes from "@/app/components/NodesCard";
import AnswerNode from "@/app/components/AnswerNode";
import ActiveNode from "@/app/components/ActiveNode";

import {
  Background,
  BackgroundVariant,
  Position,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import { ZoomSlider } from "@/components/zoom-slider";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/app/components/ChatInputCard";
import NewNodesPopup from "./components/NewNodesPopup";
import { motion, AnimatePresence } from "framer-motion";

const nodeTypes = {
  answerNode: AnswerNode,
  customNode: Nodes,
  searchNode: ChatInterface,
  activeNode: ActiveNode,
};

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  draggable: true,
};

const defaultViewport = { x: 240, y: 170, zoom: 0.65 };

export default function ChatPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "answerNode",
      position: { x: 250, y: 5 },
      data: {
        message:
          "I'm constantly facing pressure to reduce shipping costs while maintaining service levels. Can you come up with a strategy for me and summarize it? I'm using Shipoo platform.",
      },
      ...nodeDefaults,
    },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const getUniquePosition = () => {
    const initialNode = nodes[0];
    let x = initialNode.position.x + 700;
    const y = initialNode.position.y;

    while (
      nodes.some(
        (node) =>
          Math.abs(node.position.x - x) < 150 &&
          Math.abs(node.position.y - y) < 150
      )
    ) {
      x += 500;
      
    }

    return { x, y };
  };

  const addActiveNode = (message: string) => {
    const newNodeId = (nodes.length + 1).toString();
    const position = getUniquePosition();

    const newNode = {
      id: newNodeId,
      type: "activeNode",
      position,
      data: { message },
      ...nodeDefaults,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const onSelectionChange = ({ nodes }: { nodes: Array<{ id: string }> }) => {
    if (nodes.length > 0) {
      setSelectedNodeId(nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  };

  const updateNodeStyles = () => {
    return nodes.map((node) => {
      if (node.type === "answerNode") {
        return {
          ...node,
          style: {
            border: node.id === selectedNodeId ? "2px solid white" : "none",
            borderRadius: "8px",
          },
        };
      }
      return node;
    });
  };

  return (
    <div className="relative w-full h-screen bg-[#121212]">
      <AnimatePresence>
        {selectedNodeId && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-16 left-0 w-full z-20"
          >
            <NewNodesPopup addNode={addActiveNode} />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`absolute top-28 left-5 z-10 ${
          selectedNodeId ? "top-40" : ""
        }`}
      >
        <Button
          className="bg-[#232323] border-[#4B4B4B] hover:bg-[#232323]"
          onClick={() => addActiveNode("Manual Node Added")}
        >
          + Add new node
        </Button>
      </div>
      <ReactFlow
        nodes={updateNodeStyles()}
        nodeTypes={nodeTypes}
        colorMode="dark"
        className="z-0"
        defaultViewport={defaultViewport}
        onNodesChange={onNodesChange}
        onSelectionChange={onSelectionChange}
      >
        <div className="absolute bottom-20 left-5 z-10">
          <ZoomSlider />
        </div>
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
