"use client";

import { motion } from "framer-motion";
import { Minimize2, Ship } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { Carrier } from "../secondaryNode/node";
import ShippingCostInputForm from "./inputForm";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ShippingCostOutput, { ShippingCostRate } from "./costOutput";
import { Button } from "../ui/button";

interface ActiveNodeProps {
  data: {
    message?: string;
    IsSelected?: boolean;
    handleCloseNode: (nodeId: string) => void;
  };
}

export interface ShippingFormSchema {
  from_address: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "yes" | "no";
  };
  to_address: {
    name: string;
    phone: string;
    addressLine1: string;
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "yes" | "no";
  };
  packages: Array<{
    weight: {
      value: number;
      unit: "ounce" | "pound" | "gram" | "kilogram";
    };
    dimensions: {
      length: number;
      width: number;
      height: number;
      unit: "inch" | "centimeter";
    };
  }>;
}

function ShippingCostNode({ data }: ActiveNodeProps) {
  const { handleCloseNode } = data;
  let carrierData: Carrier = {};
  try {
    carrierData = JSON.parse(data.message || "");
  } catch (error) {
    console.log(error);
    carrierData = {};
  }

  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingFormSchema>({
    from_address: {
      // companyName: "",
      name: "",
      phone: "",
      addressLine1: "",
      // addressLine2: "",
      cityLocality: "",
      stateProvince: "",
      postalCode: "",
      countryCode: "",
      addressResidentialIndicator: "no",
    },
    to_address: {
      name: "",
      phone: "",
      addressLine1: "",
      cityLocality: "",
      stateProvince: "",
      postalCode: "",
      countryCode: "",
      addressResidentialIndicator: "yes",
    },
    packages: [
      {
        weight: {
          value: 0,
          unit: "ounce",
        },
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
          unit: "inch",
        },
      },
    ],
  });
  const [shippingRates, setShippingRates] = useState<ShippingCostRate[]>([]);
  const { toast } = useToast();

  const handleFetchShippingCost = async (
    inputShippingData: ShippingFormSchema
  ) => {
    setLoading(true);

    try {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rates`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...inputShippingData,
            carrierUrl: carrierData.url,
          }),
        })
      ).json();

      if (response.error) {
        throw new Error(response.error);
      }

      setShippingData(inputShippingData);
      setShippingRates(response.rates);
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-prompt-card flex items-center justify-center p-5 rounded-xl border-transparent"
    >
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />

      <div className="flex flex-col items-center justify-between w-full gap-4">
        <div className="flex items-center justify-center w-full">
          <div className="w-full flex items-center gap-4">
            <div className="rounded-full p-2 bg-rating-node-gradient">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <p className="text-white font-semibold">
              {carrierData.name} Shipping Rate Calculator
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => handleCloseNode("rate")}
            className="size-12"
          >
            <Minimize2 className="text-slate-200 cursor-pointer !size-6" />
          </Button>
        </div>
        <div className="space-y-6">
          {shippingRates.length === 0 ? (
            <div className="w-[860px] h-[540px]">
              <ScrollArea className="size-full px-3">
                <ShippingCostInputForm
                  loading={loading}
                  shippingData={shippingData}
                  handleFetchShippingCost={handleFetchShippingCost}
                />
              </ScrollArea>
            </div>
          ) : (
            <ShippingCostOutput
              resetRates={() => setShippingRates([])}
              shippingRates={shippingRates}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ShippingCostNode;
