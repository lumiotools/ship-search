"use client";

import { motion } from "framer-motion";
import { HandCoins, Loader, Mic, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { useEffect, useState, useMemo } from "react";

interface AnswerNodeProps {
  data: {
    userInput?: string;
    message?: string;
    IsSelected?: boolean;

    handleOpenCarrierNode: (carrier: Carrier) => void;
    handleSendMessage: (userInput: string) => Promise<void>;
  };
}

interface Carrier {
  name: string;
  about: string;
}

interface ApiResponse {
  data?: {
    carriers?: Carrier[];
  };
}

export default function AnswerNode({ data }: AnswerNodeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const api = useMemo(() => {
    try {
      if (data?.message && typeof data?.message === "string") {
        return JSON.parse(data.message) as ApiResponse;
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  }, [data.message]);
  const carriers = useMemo(() => api?.data?.carriers || [], [api]);

  const handleSubmit = async () => {
    if (!input) return;
    data.userInput = input;
    setInput("");
    setIsLoading(true);
    await data.handleSendMessage(data.userInput);
    setIsLoading(false);
  };


  useEffect(() => {
    if (carriers.length > 0) {
      setIsLoading(false);
    } else {
    }
  }, [carriers]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        borderImage:
          "linear-gradient(490.02deg, rgba(252, 178, 37, 0.79) -7.73%, rgba(72, 72, 72, 0) 36.72%) 1",
        borderWidth: "2.2px",
      }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={cn(
        "relative bg-prompt-card flex items-center justify-center p-5 rounded-xl",
        isLoading
          ? "animate-rotateBorder border-[3px] border-transparent"
          : "border-none"
      )}
      style={{
        borderImageSource: isLoading
          ? "linear-gradient(400.02deg, rgba(252, 178, 37, 0.79) -7.73%, rgba(72, 72, 72, 0) 36.72%)"
          : "none",
        borderImageSlice: isLoading ? 1 : undefined,
        borderWidth: isLoading ? "3px" : "none",
      }}
    >
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />

      <div
        className={cn(
          "flex flex-col items-center justify-between w-full gap-4",
          data.IsSelected ? "border-2 border-white" : ""
        )}
      >
        <div className="flex items-center justify-center w-full">
          <div className="w-full flex items-center gap-4">
            <div className="rounded-full p-2 bg-node-icon-gradient">
              <HandCoins className="w-5 h-5 text-white" />
            </div>
            <p className="text-white">Results</p>
          </div>
          <div>
            <Minimize2 className="text-slate-200 cursor-pointer"></Minimize2>
          </div>
        </div>
        <div className="w-[600px] space-y-6">
          {data.userInput && (
            <div className="w-10/12 bg-prompt-card-1 rounded-2xl p-5 shadow-lg border border-[#2A2A2A] ml-auto">
              <p className="text-sm text-white text-justify">
                {data.userInput}
              </p>
            </div>
          )}

          {!isLoading && carriers.length > 0 && (
            <div className="w-full bg-[#232323] rounded-2xl p-5 shadow-lg">
              <div className="grid grid-cols-2 gap-5 mt-4">
                {carriers.map((carrier, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-3 gap-3 text-white rounded-xl"
                    style={{
                      backgroundImage: [
                        "linear-gradient(270deg, rgba(60, 73, 255, 0.54) 0%, rgba(150, 157, 255, 0.54) 100%)",
                        "linear-gradient(270deg, rgba(140, 66, 237, 0.54) 0%, rgba(202, 168, 247, 0.54) 100%)",
                        "linear-gradient(270deg, rgba(0, 127, 76, 0.4) 0%, rgba(107, 233, 182, 0.4) 100%)",
                        "linear-gradient(270deg, rgba(14, 97, 161, 0.73) 0%, rgba(20, 130, 214, 0.73) 100%)",
                      ][index % 4],
                    }}
                    onClick={() => data.handleOpenCarrierNode(carrier)}
                  >
                    <h2 className="text-sm">{carrier.name}</h2>
                    <p className="text-xs text-white/60">{carrier.about}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                "w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl pl-12 pr-24 py-6",
                "text-white placeholder:text-[#808080]"
              )}
              placeholder="Type here"
            />
            <Mic className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808080]" />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "bg-prompt-card-icon hover:bg-[#F5A623]/90 text-white rounded-lg px-6"
              )}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
