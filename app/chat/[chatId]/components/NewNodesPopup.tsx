import { Button } from "@/components/ui/button";
import React from "react";

interface Carrier {
  name: string;
  about: string;
}

interface NewNodesPopupProps {
  addNode: (node: string) => void;
  carriers: Carrier[];
}

const NewNodesPopup: React.FC<NewNodesPopupProps> = ({ addNode, carriers }) => {
  console.log("Line 15",carriers)
  return (
    <div className="bg-[#121212] flex flex-col items-center justify-center w-full px-5 py-2 shadow-active-nodes">
      <h2 className="text-[#929292] text-base font-medium mb-3 text-center mt-2 md:mt-0">
        Active Nodes
      </h2>
      <div className="flex flex-wrap gap-3 justify-center w-full">
        {carriers.map((carrier) => (
          <Button
            key={carrier.name}
            className="bg-[#232323] border-[#4B4B4B] hover:bg-[#232323] px-4 rounded-full text-xs"
            onClick={() => addNode(JSON.stringify(carrier))}
          >
            {carrier.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NewNodesPopup;