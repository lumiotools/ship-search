import { motion } from "framer-motion";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SecondaryNodeAssistantMessageCard = ({
  message,
}: {
  message: string;
}) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true }}
      className="max-w-[80%] w-[768px] bg-prompt-card-1 rounded-2xl p-5 shadow-lg border mr-auto space-y-4 text-white text-start prose prose-invert"
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => (
            <a href={props.href} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ),
        }}
      >
        {message}
      </Markdown>
    </motion.div>
  );
};

export default SecondaryNodeAssistantMessageCard;
