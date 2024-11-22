"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Nodes from "@/app/components/NodesCard";

export default function NewChatInput({ data }: { data: { message: string } }) {
  const router = useRouter();
  console.log(data);
  const [showNodes, setShowNodes] = useState(false);

  const handleSendMessage = () => {
    setShowNodes(true);

    // setTimeout(() => {
      const chatId = Date.now().toString();
      router.push(`/chat/${chatId}`);
    // }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {showNodes ? (
        <Nodes
          data={{ message: "Please wait while we prepare your chat..." }}
        />
      ) : (
        <motion.div
          className="bg-prompt-card flex items-center justify-center p-5 rounded-xl border-transparent"
          animate={{
            borderImage:
              "linear-gradient(469.02deg, rgba(252, 178, 37, 0.79) -7.73%, rgba(72, 72, 72, 0) 36.72%) 1",
          }}
          transition={{
            loop: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-[600px] space-y-3">
            <div className="bg-prompt-card-1 rounded-2xl p-8 shadow-lg border border-[#2A2A2A]">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-10 h-10 bg-prompt-card-icon rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-xl">
                    Hi, I am{" "}
                    <span className="text-prompt-card-icon">ShipSearch AI</span>
                  </h1>
                  <p className="text-prompt-card-subeheading text-base">
                    How can I help you with any shipping query?
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Input
                className={cn(
                  "w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl pl-12 pr-24 py-6",
                  "text-white placeholder:text-[#808080]"
                )}
                placeholder="Type here"
                onKeyDown={handleKeyDown}
              />
              <Mic className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808080]" />
              <Button
                onClick={handleSendMessage}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2",
                  "bg-prompt-card-icon hover:bg-[#F5A623]/90 text-white rounded-lg px-6"
                )}
              >
              Submit
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
