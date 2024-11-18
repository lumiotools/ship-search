"use client";

import React, { useState, useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
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
// import { Button } from "@/components/ui/button";
import NewNodesPopup from "./components/NewNodesPopup";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ShippingCostNode from "@/components/shipping-cost/node";

// Define Carrier type
interface Carrier {
  name: string;
  about: string;
}

const nodeTypes = {
  answerNode: AnswerNode,
  activeNode: ActiveNode,
  shippingCostNode: ShippingCostNode,
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
    data: { carriers: Carrier[] };
    UserSearch: string;
  } | null>(null);
  const searchPara = useSearchParams();

  const [carriersData, setCarriersData] = useState<Carrier[]>([]);

  useEffect(() => {
    const initialUserInput = searchPara.get("message") || "";
    if (!initialUserInput) return;
    setUserInput(initialUserInput);

    setNodes([
      {
        id: "result",
        type: "answerNode",
        position: { x: 250, y: 5 },
        data: {
          userInput: initialUserInput,
          message: "",
          handleOpenCarrierNode: (carrier: Carrier) => {
            console.log(carrier);
          },
          handleSendMessage,
          handleCloseNode,
        },
        ...nodeDefaults,
      },
    ]);

    handleSendMessage(initialUserInput);
  }, [searchPara]);

  const handleSendMessage = async (userInput: string) => {
    const userMessage = userInput;
    setCarriersData([]);
    setNodes([
      {
        id: "result",
        type: "answerNode",
        position: { x: 250, y: 5 },
        data: {
          userInput,
          message: "",
          handleOpenCarrierNode: (carrier: Carrier) => {
            addActiveNode(JSON.stringify(carrier));
          },
          handleSendMessage,
          handleCloseNode,
        },
        ...nodeDefaults,
      },
    ]);
    if (!userMessage) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`,
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
      setUserInput("");
      const data = await response.json();
      const apiData = {
        data: data.message,
        UserSearch: userInput,
        userInput,
      };
      setApiResponse(apiData);

      setNodes([
        {
          id: "result",
          type: "answerNode",
          position: { x: 250, y: 5 },
          data: {
            userInput,
            message: JSON.stringify(apiData),
            handleOpenCarrierNode: (carrier: Carrier) => {
              addActiveNode(JSON.stringify(carrier));
            },
            handleSendMessage,
            handleCloseNode,
          },
          ...nodeDefaults,
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCloseNode = (nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      )
    );
  };

  const handleShippingCostAddNode = (carrier: Carrier) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: "rate",
        type: "shippingCostNode",
        position: { x: 1900, y: 5 },
        data: {
          userInput,
          message: JSON.stringify(carrier),
          handleOpenCarrierNode: (carrier: Carrier) => {
            console.log(carrier);
          },
          handleSendMessage,
          handleCloseNode,
        },
        ...nodeDefaults,
      },
    ]);

    setEdges((prevEdges) =>
      addEdge(
        {
          id: `e3-2`,
          source: "carrier",
          target: "rate",
          animated: false,
          style: { stroke: "#FCB22563", border: "1px solid #FCB22563" },
        },
        prevEdges
      )
    );
  };

  useEffect(() => {
    // Directly use `carriers` if already an object
    if (apiResponse?.data?.carriers) {
      setCarriersData(apiResponse.data.carriers);
    }
  }, [apiResponse]);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "result",
      type: "answerNode",
      position: { x: 250, y: 5 },
      data: {
        userInput,
        message:
          "I'm constantly facing pressure to reduce shipping costs while maintaining service levels. Can you come up with a strategy for me and summarize it? I'm using Shipoo platform.",
        handleOpenCarrierNode: (carrier: Carrier) => {
          console.log(carrier);
        },
        handleSendMessage,
        handleCloseNode,
      },
      ...nodeDefaults,
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e1-2",
      source: "result",
      target: "carrier",
      animated: false,
      style: { stroke: "#FCB22563", border: "1px solid #FCB22563" },
    },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const getUniquePosition = () => {
    const initialNode = nodes[0];
    const x = initialNode.position.x + 700;
    const y = initialNode.position.y;

    // while (
    //   nodes.some(
    //     (node) =>
    //       Math.abs(node.position.x - x) < 150 &&
    //       Math.abs(node.position.y - y) < 150
    //   )
    // ) {
    //   x += 500;
    // }

    return { x, y };
  };

  const addActiveNode = (message: string) => {
    // const newNodeId = (nodes.length + 1).toString();
    const position = getUniquePosition();

    const newNode = {
      id: "carrier",
      type: "activeNode",
      position,
      data: {
        userInput,
        message,
        handleShippingCostAddNode,
        handleOpenCarrierNode: (carrier: Carrier) => {
          console.log(carrier);
        },
        handleSendMessage,
        handleCloseNode,
      },
      ...nodeDefaults,
    };

    setNodes((prevNodes) => [prevNodes[0], newNode]);

    setEdges((prevEdges) =>
      addEdge(
        {
          id: `e${"carrier"}-1`,
          source: "result",
          target: "carrier",
          animated: false,
          style: { stroke: "#FCB22563", border: "1px solid #FCB22563" },
        },
        prevEdges
      )
    );
  };

  const onSelectionChange = ({ nodes }: { nodes: Array<{ id: string }> }) => {
    setSelectedNodeId(nodes.length > 0 ? nodes[0].id : null);
  };

  const onConnect = useCallback(
    (params: { source: string; target: string }) => {
      const newEdgeId = `e${params.source}-${params.target}`;
      setEdges((prevEdges) =>
        addEdge(
          {
            id: newEdgeId,
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
    return nodes.map((node) => ({
      ...node,
      style: {
        border: node.id === selectedNodeId ? "2px solid white" : "none",
        borderRadius: "8px",
      },
    }));
  };

  return (
    <div className="relative w-full h-screen bg-[#121212]">
      <AnimatePresence>
        {selectedNodeId && carriersData.length > 0 && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-12 md:top-16 left-0 w-full z-20"
          >
            <NewNodesPopup addNode={addActiveNode} carriers={carriersData} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* <div
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
      </div> */}
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
        preventScrolling={false}
        disableKeyboardA11y={true}
      >
        <div className="absolute bottom-20 left-5 z-10">
          <ZoomSlider />
        </div>
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
