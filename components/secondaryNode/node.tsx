"use client";

import { motion } from "framer-motion";
import {
  Building,
  Globe,
  Link,
  Loader,
  Mic,
  Minimize2,
  Package2,
  Ship,
  Star,
  Stars,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import SecondaryNodeUserMessageCard from "./userMessageCard";
import { useEffect, useRef, useState } from "react";
import SecondaryNodeAssistantMessageCard from "./assistantMessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CarrierReview {
  name: string;
  rating: number;
  review: string;
  url: string;
}

export interface Carrier {
  name?: string;
  about?: string;
  services?: string[];
  achievements?: string[];
  reviews?: CarrierReview[];
  headquarter?: string;
  type?: string;
  url?: string;
}

interface ChatMessage {
  role: string;
  content: string;
}

export default function CarrierChatInterface({
  carrier,
}: {
  carrier: Carrier;
}) {
  console.log("Carrier", carrier);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    try {
      const userMessage = inputRef.current?.value || "";
      if(!userMessage) return;
      setIsLoading(true);
      setChatHistory([...chatHistory, { role: "user", content: userMessage }]);

      inputRef.current!.value = "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/carrier`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carrierName: carrier.name,
            chatHistory: [
              { role: "user", content: `Tell me about ${carrier.name}` },
              { role: "assistant", content: JSON.stringify(carrier) },
              ...chatHistory,
            ],
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setChatHistory([
        ...chatHistory,
        { role: "user", content: userMessage },
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    scrollRef.current?.children[1].scrollTo(
      0,
      scrollRef.current?.children[1].scrollHeight
    );
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
            <p className="text-white font-semibold">{carrier.name}</p>
          </div>
          <div>
            <Minimize2 className="text-slate-200 cursor-pointer" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="w-[860px] h-[540px]">
            <ScrollArea className="size-full" ref={scrollRef}>
              <div className="flex flex-col-reverse gap-6 px-6">
                {[...chatHistory]
                  .reverse()
                  .map(({ role, content }, index) =>
                    role === "user" ? (
                      <SecondaryNodeUserMessageCard
                        key={chatHistory.length - index}
                        message={content}
                      />
                    ) : (
                      <SecondaryNodeAssistantMessageCard
                        key={chatHistory.length - index}
                        message={content}
                      />
                    )
                  )}

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  className="w-full bg-prompt-card-1 rounded-2xl p-5 shadow-lg border mr-auto space-y-4"
                >
                  <div className="flex gap-x-4 font-semibold">
                    <div className="bg-[#FF991F33] text-white p-2 rounded-full flex gap-2 justify-center items-center px-3">
                      <Building className="size-5" /> {carrier.headquarter}
                    </div>
                    <div className="bg-[#00875A66] text-white p-2 rounded-full flex gap-2 justify-center items-center px-3">
                      <Ship className="size-5" /> {carrier.type}
                    </div>
                    <div className="bg-[#5243AA66] text-white p-2 rounded-full flex gap-2 justify-center items-center px-3">
                      <Link className="size-5" />{" "}
                      <a href={carrier.url} target="_blank">
                        Visit Website
                      </a>
                    </div>
                  </div>
                  <p className="text-white text-lg"> {carrier.about} </p>
                  <div className="w-full flex items-start gap-2 flex-col bg-[#8800ff31] p-4 rounded-xl">
                    <div className="flex justify-center items-center gap-3">
                      <div className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                        <Globe className="bg-[#b969ff31] p-1 size-8 rounded-full" />
                        <h2>Services</h2>
                      </div>
                    </div>
                    <ul className="w-full grid grid-cols-2 gap-3 text-white text-sm font-semibold whitespace-normal">
                      {carrier.services &&
                        carrier.services.map((item: string, index: number) => (
                          <li
                            key={index}
                            className="bg-[#b969ff31] rounded-lg px-4 py-3"
                          >
                            {index + 1}. {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                  {carrier.achievements && (
                    <div className="bg-gray-800 rounded-2xl p-4 mb-6 text-white">
                      <div className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                        <Trophy className="bg-gray-700 p-1.5 size-8 rounded-full" />
                        <h2>Key Achievements</h2>
                      </div>
                      <ul className="grid grid-cols-1 gap-3 text-white text-sm font-semibold whitespace-normal">
                        {carrier.services &&
                          carrier.achievements.map(
                            (achievement: string, index: number) => (
                              <li
                                key={index}
                                className="bg-gray-700 rounded-lg px-4 py-3"
                              >
                                {index + 1}. {achievement}
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  )}
                  <div className="flex gap-5 w-full">
                    {carrier.reviews &&
                      carrier.reviews.map((review, index) => (
                        <div
                          key={index}
                          className={`flex-1 flex items-start justify-between gap-2 flex-col ${
                            [
                              "bg-[#FF991F33]",
                              "bg-[#00875A66]",
                              "bg-[#5243AA66]",
                            ][index % 3]
                          } p-4 rounded-xl max-w-[180px]`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              ["bg-[#FF991F]", "bg-[#00CF8A]", "bg-[#6C59DA]"][
                                index % 3
                              ]
                            }`}
                          >
                            <Stars />
                          </div>
                          <p className="text-white text-sm mt-1 font-semibold">
                            {review.name}
                          </p>
                          <div className="text-white text-sm flex gap-1">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "size-3",
                                    i < (review.rating ?? 0)
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-amber-400"
                                  )}
                                />
                              ))}
                          </div>
                          <p className="text-slate-400 text-xs whitespace-normal line-clamp-4">
                            {review.review}
                          </p>
                          <a
                            className="text-slate-400 text-xs whitespace-normal underline"
                            href={review.url}
                            target="_blank"
                          >
                            Read More
                          </a>
                        </div>
                      ))}
                    {/* {carrier.reviews && carrier.reviews[0] && (
                      <div className="flex-1  flex items-start justify-between gap-2 flex-col bg-[#00875A66] p-4 rounded-xl max-w-[180px]">
                        <div className="bg-[#00CF8A] p-2 rounded-full">
                          <Waypoints />
                        </div>
                        <p className="text-white text-sm mt-1 font-semibold">
                          {carrier.reviews[0].name}
                        </p>
                        <div className="text-white text-sm flex gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "size-3",
                                  i < (carrier.reviews?.[0]?.rating ?? 0)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-amber-400"
                                )}
                              />
                            ))}
                        </div>
                        <p className="text-slate-400 text-xs whitespace-normal line-clamp-4">
                          {carrier.reviews[0].review}
                        </p>
                        <a
                          className="text-slate-400 text-xs whitespace-normal underline"
                          href={carrier.reviews[0].url}
                          target="_blank"
                        >
                          Read More
                        </a>
                      </div>
                    )}
                    {carrier.reviews && carrier.reviews[1] && (
                      <div className="flex-1 flex items-start justify-between gap-2 flex-col bg-[#5243AA66] p-4 rounded-xl max-w-[180px]">
                        <div className="bg-[#6C59DA] p-2 rounded-full">
                          <SearchCheck />
                        </div>
                        <p className="text-white text-sm mt-1 font-semibold">
                          {carrier.reviews[1].name}
                        </p>
                        <div className="text-white text-sm flex gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "size-3",
                                  i < (carrier.reviews?.[1]?.rating ?? 0)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-amber-400"
                                )}
                              />
                            ))}
                        </div>
                        <p className="text-slate-400 text-xs whitespace-normal line-clamp-4 mt-1">
                          {carrier.reviews[1].review}
                        </p>
                        <a
                          className="text-slate-400 text-xs whitespace-normal underline"
                          href={carrier.reviews[1].url}
                          target="_blank"
                        >
                          Read More
                        </a>
                      </div>
                    )} */}
                  </div>
                </motion.div>
              </div>
            </ScrollArea>
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
