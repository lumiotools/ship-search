import SecondaryNode, { Carrier } from "@/components/secondaryNode/node";

interface ActiveNodeProps {
  data: {
    message?: string;
    IsSelected?: boolean;
  };
}

const ActiveNode = ({ data }: ActiveNodeProps) => {
  let carrierData: Carrier = {};
  // @ts-ignore
  const {handleCalCostAddNode} =data;
  console.log("data ..",data)
  try {
    carrierData = JSON.parse(data.message || "");
  } catch (error) {
    console.log(error);
    carrierData = {};
  }

  return <SecondaryNode key={carrierData.name} carrier={carrierData} handleCalCostAddNode={handleCalCostAddNode}/>;
};

export default ActiveNode;
