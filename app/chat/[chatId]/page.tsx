"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import { ZoomSlider } from "@/components/zoom-slider";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/app/components/ChatInputCard";
import NewNodesPopup from "./components/NewNodesPopup";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

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
  const [userInput, setUserInput] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<{
    data: string;
    UserSearch: string;
  } | null>(null);
  console.log("data", apiResponse);

  const searchPara = useSearchParams();
  console.log(searchPara);

  console.log("user", userInput);

  // useEffect(() => {
  //   setUserInput(searchPara.get("message") || "");
  //   handleSendMessage(searchPara.get("message") || "");
  // }, [searchPara]);

  useEffect(() => {
    const initialUserInput = searchPara.get("message") || "";
    setUserInput(initialUserInput);

    // Set initial node with userInput immediately
    setNodes([
      {
        id: "1",
        type: "answerNode",
        position: { x: 250, y: 5 },
        data: {
          userInput: initialUserInput,
          message: "",
        },
        ...nodeDefaults,
      },
    ]);

    // Trigger API call to get response
    handleSendMessage(initialUserInput);
  }, [searchPara]);

  const handleSendMessage = async (userInput: string) => {
    const userMessage = userInput;

    try {
      const response = await fetch(
        "https://orchestro-ai-backend.onrender.com/api/v1/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatHistory: [],
            message: userMessage,
            json: true,
          }),
        }
      );

      const data = await response.json();
      const apiData = {
        data: data.message,
        UserSearch: userInput,
        userInput,
      };
      setApiResponse(apiData);
      setNodes([
        {
          id: "1",
          type: "answerNode",
          position: { x: 250, y: 5 },
          data: {
            userInput,
            message: JSON.stringify(apiData),
          },
          ...nodeDefaults,
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "answerNode",
      position: { x: 250, y: 5 },
      data: {
        userInput,
        message:
          "I'm constantly facing pressure to reduce shipping costs while maintaining service levels. Can you come up with a strategy for me and summarize it? I'm using Shipoo platform.",
      },
      ...nodeDefaults,
    },
  ]);

  // Initialize edges with an initial edge connecting node "1" to a new node "2"
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e1-2", // Unique edge ID
      source: "1", // Source node ID
      target: "2", // Target node ID (you can create a node with ID "2" later)
      animated: false,
      style: { stroke: "#FCB22563", border: "1px solid #FCB22563" },
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
      data: { userInput, message },
      ...nodeDefaults,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    // Automatically add an edge connecting the new node to the initial node (ID "1")
    setEdges((prevEdges) =>
      addEdge(
        {
          id: `e${newNodeId}-1`,
          source: "1",
          target: newNodeId,
          animated: false,
          style: { stroke: "#FCB22563", border: "1px solid #FCB22563" },
        },
        prevEdges
      )
    );
  };

  const onSelectionChange = ({ nodes }: { nodes: Array<{ id: string }> }) => {
    if (nodes.length > 0) {
      setSelectedNodeId(nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  };

  // Handles user-defined connections between nodes
  const onConnect = useCallback(
    (params: { source: string; target: string }) => {
      const newEdgeId = `e${params.source}-${params.target}`; // Generate a unique ID for the edge
      setEdges((prevEdges) =>
        addEdge(
          {
            id: newEdgeId, // Add the id property
            ...params,
            animated: false,
            style: { stroke: "#FCB22563", border: "1px solid #FCB22563" },
          },
          prevEdges
        )
      );
    },
    []
  );

  const updateNodeStyles = () => {
    return nodes.map((node) => {
      if (node.type === "answerNode" || node.type === "activeNode") {
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
            className="absolute top-12 md:top-16 left-0 w-full z-20"
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
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode="dark"
        className="z-0"
        defaultViewport={defaultViewport}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
