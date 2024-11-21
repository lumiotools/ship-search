import { motion } from "framer-motion";
import React from "react";

const ApiDocNodeUserMessageCard = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true }}
      className="max-w-[80%] w-fit bg-prompt-card-1 rounded-2xl p-5 shadow-lg border ml-auto space-y-4 text-white text-end"
    >
      {message}
    </motion.div>
  );
};

export default ApiDocNodeUserMessageCard;
