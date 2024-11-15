"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import main from "../../public/main.png";
import AnswerNode from "./AnswerNode";
import ChatInterface from "./ChatInputCard";
import Nodes from "./NodesCard";
import { Carrier } from "@/components/secondaryNode/node";

const Main = () => {
  const [showChat, setShowChat] = useState(false);
  const [displayNodes] = useState(false);
  const [showAnswerNode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-navbar-bg flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <Image src={main} alt="Main Image" className="p-8 mt-10" />

        {showChat && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute flex justify-center items-center"
          >
            {!displayNodes ? (
              <ChatInterface />
            ) : showAnswerNode ? (
              <AnswerNode
                data={{
                  message: "Here’s your optimized shipping strategy.",
                  handleOpenCarrierNode: (carrier: Carrier) => {
                    console.log(carrier);
                  },
                }}
              />
            ) : (
              <Nodes
                data={{
                  message:
                    "I'm constantly facing pressure to reduce shipping costs.",
                }}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Main;
