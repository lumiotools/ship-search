import SecondaryNode, { Carrier } from "@/components/secondaryNode/node";

interface ActiveNodeProps {
  data: {
    message?: string;
    IsSelected?: boolean;
    handleShippingCostAddNode: (carrier: Carrier) => void;
    handleApiDocChatAddNode: (carrier: Carrier) => void;
    handleCloseNode: (nodeId: string) => void;
  };
}

const ActiveNode = ({ data }: ActiveNodeProps) => {
  let carrierData: Carrier = {};
  const {
    handleShippingCostAddNode,
    handleApiDocChatAddNode,
    handleCloseNode,
  } = data;
  console.log("data ..", data);
  try {
    carrierData = JSON.parse(data.message || "");
  } catch (error) {
    console.log(error);
    carrierData = {};
  }

  return (
    <SecondaryNode
      key={carrierData.name}
      carrier={carrierData}
      handleShippingCostAddNode={handleShippingCostAddNode}
      handleApiDocChatAddNode={handleApiDocChatAddNode}
      handleCloseNode={handleCloseNode}
    />
  );
};

export default ActiveNode;
