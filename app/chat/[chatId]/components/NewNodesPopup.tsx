import { Button } from "@/components/ui/button";
import React from "react";

interface NewNodesPopupProps {
  addNode: (node: string) => void;
}

const NewNodesPopup: React.FC<NewNodesPopupProps> = ({ addNode }) => {
  return (
    <div className="bg-[#121212] flex flex-col items-center justify-center w-full px-5 py-2 shadow-active-nodes">
      <h2 className="text-[#929292] text-base font-medium mb-3 text-center mt-2 md:mt-0">
        Active Nodes
      </h2>
      <div className="flex items-center gap-3 justify-between w-full">
        <Button
          className="bg-[#232323] border-[#4B4B4B] hover:bg-[#232323] px-4 rounded-full text-xs"
          onClick={() =>
            addNode("Optimize Carrier Selection with Rate Shopping")
          }
        >
          Optimize Carrier Selection with Rate Shopping
        </Button>
        <Button
          className="bg-[#232323] border-[#4B4B4B] hover:bg-[#232323] p-2 rounded-full text-xs"
          onClick={() => addNode("Leverage Shippo's Discounted Rates")}
        >
          Leverage Shippo&apos;s Discounted Rates
        </Button>
        <Button
          className="bg-[#232323] border-[#4B4B4B] hover:bg-[#232323] p-2 rounded-full text-xs"
          onClick={() =>
            addNode("Negotiate with Carriers for Volume Discounts")
          }
        >
          Negotiate with Carriers for Volume Discounts
        </Button>
        <Button
          className="bg-[#232323] border-[#4B4B4B] hover:bg-[#232323] p-2 rounded-full text-xs"
          onClick={() => addNode("Consolidate Orders")}
        >
          Consolidate Orders
        </Button>
      </div>
    </div>
  );
};

export default NewNodesPopup;
