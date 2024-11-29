import SecondaryNode, { Carrier } from "@/components/secondaryNode/node";

interface ActiveNodeProps {
  data: {
    message?: string;
    IsSelected?: boolean;
    handleShippingCostAddNode: (carrier: Carrier) => void;
    handleApiDocChatAddNode: (carrier: Carrier) => void;
    handleRatesNegotiationChatAddNode: (carrier: Carrier) => void;
    handleContactFormAddNode: (carrier: Carrier) => void;
    handleCloseNode: (nodeId: string) => void;
  };
}

const ActiveNode = ({ data }: ActiveNodeProps) => {
  let carrierData: Carrier = {};
  const {
    handleShippingCostAddNode,
    handleApiDocChatAddNode,
    handleRatesNegotiationChatAddNode,
    handleContactFormAddNode,
    handleCloseNode,
  } = data;
  //console.log("data ..", data);
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
      handleRatesNegotiationChatAddNode={handleRatesNegotiationChatAddNode}
      handleContactFormAddNode={handleContactFormAddNode}
      handleCloseNode={handleCloseNode}
    />
  );
};

export default ActiveNode;
