"use client";
import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";

const HandleReactFlowNodeFocus = () => {
  const { getNodes, fitView } = useReactFlow();
  const nodes = getNodes();

  useEffect(() => {
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
      fitView({
        nodes: [lastNode],
        padding: 0.5,
        duration: 1000,
        maxZoom: 1,
      });
    }
  }, [nodes]);
  return null;
};

export default HandleReactFlowNodeFocus;
