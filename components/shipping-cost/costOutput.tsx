import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleAlert } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface ShippingCostRate {
  serviceType: string;
  serviceCode: string;
  estimatedDeliveryDate: string;
  shipDate: string;
  amounts: {
    currency: string;
    shipping: number;
    insurance: number;
    confirmation: number;
    other: number;
  };
}

const ShippingCostOutput = ({
  resetRates,
  shippingRates,
}: {
  resetRates: () => void;
  shippingRates: ShippingCostRate[];
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      //   timeZoneName: "short",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="w-full bg-prompt-card-1 rounded-2xl p-5 shadow-lg border mr-auto space-y-4"
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="flex items-center gap-3">
              <Button className="size-6 p-0" onClick={() => resetRates()}>
                <ChevronLeft />
              </Button>
              Service Type
            </TableHead>
            <TableHead>Estimated Delivery</TableHead>
            <TableHead>Ship Date</TableHead>
            {/* <TableHead>Shipping Cost</TableHead> */}
            {/* <TableHead>Other Fees</TableHead> */}
            <TableHead>Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-white space-y-4">
          {shippingRates.map((rate) => (
            <TableRow key={rate.serviceCode}>
              <TableCell className="font-semibold py-5">
                {rate.serviceType}
              </TableCell>
              <TableCell>{formatDate(rate.estimatedDeliveryDate)}</TableCell>
              <TableCell>{formatDate(rate.shipDate)}</TableCell>
              {/* <TableCell>{formatCurrency(rate.amounts.shipping)}</TableCell>
              <TableCell>{formatCurrency(rate.amounts.other)}</TableCell> */}
              <TableCell className="flex py-5 items-center">
                {formatCurrency(
                  rate.amounts.shipping +
                    rate.amounts.insurance +
                    rate.amounts.confirmation +
                    rate.amounts.other
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="size-4 p-0 ml-2" variant="ghost">
                        <CircleAlert className="size-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs py-2 px-4 mr-8 space-y-0.5 border border-gray-500/20">
                      <p>Shipping: {formatCurrency(rate.amounts.shipping)}</p>
                      <p>Insurance: {formatCurrency(rate.amounts.insurance)}</p>
                      <p>
                        Confirmation:{" "}
                        {formatCurrency(rate.amounts.confirmation)}
                      </p>
                      <p>Other: {formatCurrency(rate.amounts.other)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ShippingCostOutput;
