import { motion } from "framer-motion";
import { HandCoins, Mic, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Nodes = ({ data }: { data: { message?: string } }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{
      opacity: 1,
      scale: 1,
      borderRadius: "2px",
      borderImage:
        "linear-gradient(490.02deg, rgba(252, 178, 37, 0.79) -7.73%, rgba(72, 72, 72, 0) 36.72%) 1",
      borderWidth: "1px",
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-prompt-card flex items-center justify-center p-5 rounded-xl border-transparent"
  >
    <div className="flex flex-col items-center justify-between w-full gap-4">
      <div className="flex items-center justify-center w-full">
        <div className="w-full flex items-center gap-4">
          <div className="rounded-full p-2 bg-node-icon-gradient">
            <HandCoins className="w-5 h-5 text-white" />
          </div>
          <p className="text-white">Shipping Cost Optimizer</p>
        </div>
        <div>
          <Minimize2 className="text-slate-200 cursor-pointer"></Minimize2>
        </div>
      </div>
      <div className="w-[250px] md:w-[600px] space-y-6">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="max-w-[80%] w-fit bg-prompt-card-1 border-prompt-card-icon/20 rounded-2xl p-5 shadow-lg border border-[#2A2A2A] flex items-end justify-stretch ml-auto"
        >
          <p className="text-white text-justify">
            {typeof data.message === "string"
              ? data.message
              : "I'm constantly facing pressure to reduce shipping costs while maintaining service levels. Can you come up with a strategy for me and summarize it? I'm using Shipoo platform."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="relative"
        >
          <Input
            className={cn(
              "w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl pl-12 pr-24 py-6",
              "text-white placeholder:text-[#808080]"
            )}
            placeholder="Type here"
          />
          <Mic className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808080]" />
          <Button
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2",
              "bg-prompt-card-icon hover:bg-[#F5A623]/90 text-white rounded-lg px-6"
            )}
          >
            Submit
          </Button>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export default Nodes;
