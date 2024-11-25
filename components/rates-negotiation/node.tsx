"use client";

import { motion } from "framer-motion";
import { Book, Loader, Mic, Minimize2, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Handle, Position } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carrier } from "../secondaryNode/node";
import { useToast } from "@/hooks/use-toast";
import ChatUserMessageCard from "../chat/userMessageCard";
import ChatAssistantMessageCard from "../chat/assistantMessageCard";

interface ActiveNodeProps {
  data: {
    message?: string;
    IsSelected?: boolean;
    handleShippingCostAddNode: (carrier: Carrier) => void;
    handleCloseNode: (nodeId: string) => void;
  };
}

interface ChatMessage {
  role: string;
  content: string;
}

export default function RatesNegotiationChatNode({ data }: ActiveNodeProps) {
  let carrier: Carrier = {};
  const { handleCloseNode } = data;
  console.log("data ..", data);
  try {
    carrier = JSON.parse(data.message || "");
  } catch (error) {
    console.log(error);
    carrier = {};
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    try {
      const userMessage = inputRef.current?.value || "";
      if (!userMessage) return;
      setIsLoading(true);
      setChatHistory([...chatHistory, { role: "user", content: userMessage }]);

      inputRef.current!.value = "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/rates-negotiation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carrierUrl: carrier.url,
            chatHistory: [
              { role: "user", content: `Tell me about ${carrier.name}` },
              { role: "assistant", content: JSON.stringify(carrier) },
              ...chatHistory,
            ],
            message: userMessage,
          }),
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      // Initialize the assistant message
      const assistantMessage = { role: "assistant", content: "" };
      setChatHistory((prev) => [...prev, assistantMessage]);

      const assistantMessageIndex = chatHistory.length + 1;

      while (!done) {
        const { value, done: doneReading } = await reader!.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });

        // Update assistant message content progressively
        assistantMessage.content += chunkValue;

        // Update the state with the progressively updated message
        setChatHistory((prev) => {
          const newMessages = [...prev];
          newMessages[assistantMessageIndex] = assistantMessage; // Update the specific message
          return newMessages;
        });
      }
    } catch (error: unknown) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (chatHistory.length === 0) return;
    scrollRef.current?.children[1].scrollTo({
      top: scrollRef.current?.children[1].scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

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
            <div className="rounded-full p-2 bg-active-node-gradient">
              <Package2 className="w-5 h-5 text-white" />
            </div>
            <p className="text-white font-semibold">
              {carrier.name} Rates Negotiation Chat
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => handleCloseNode("ratesNegotiationChat")}
            className="size-12"
          >
            <Minimize2 className="text-slate-200 cursor-pointer !size-6" />
          </Button>
        </div>
        <div className="space-y-6">
          <div className="w-[860px] h-[540px]">
            {chatHistory.length > 0 ? (
              <ScrollArea className="size-full" ref={scrollRef}>
                <div className="flex flex-col-reverse gap-6 px-6">
                  {[...chatHistory]
                    .reverse()
                    .map(({ role, content }, index) =>
                      role === "user" ? (
                        <ChatUserMessageCard
                          key={chatHistory.length - index}
                          message={content}
                        />
                      ) : (
                        <ChatAssistantMessageCard
                          key={chatHistory.length - index}
                          message={content}
                        />
                      )
                    )}
                </div>
              </ScrollArea>
            ) : (
              <div className="size-full flex flex-col justify-center items-center text-center gap-4">
                <div className="size-16 bg-prompt-card-icon rounded-2xl flex items-center justify-center">
                  <Book className="size-10 text-white" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-2xl">
                    <span className="text-prompt-card-icon">
                      {carrier.name}
                    </span>{" "}
                    Rates Negotiation Chat
                  </h1>
                  <p className="text-prompt-card-subeheading text-lg">
                    Have a question about how to optimize rates for{" "}
                    {carrier.name}? Ask me!
                  </p>
                </div>
              </div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <Input
              className="w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl pl-12 pr-24 py-6 text-white placeholder:text-[#808080]"
              placeholder="Type here"
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <Mic className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808080]" />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-prompt-card-icon hover:bg-[#F5A623]/90 text-white rounded-lg px-6"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
