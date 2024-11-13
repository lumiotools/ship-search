import { motion } from "framer-motion";
import {
  History,
  Mic,
  Minimize2,
  Package2,
  SearchCheck,
  Waypoints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ActiveNode = ({ data }: { data: { message?: string } }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-prompt-card flex items-center justify-center p-5 rounded-xl border-transparent"
  >
    <div className="flex flex-col items-center justify-between w-full gap-4">
      <div className="flex items-center justify-center w-full">
        <div className="w-full flex items-center gap-4">
          <div className="rounded-full p-2 bg-active-node-gradient">
            <Package2 className="w-5 h-5 text-white" />
          </div>
          <p className="text-white font-semibold">
            {data.message || "Default message"}
          </p>
        </div>
        <div>
          <Minimize2 className="text-slate-200 cursor-pointer"></Minimize2>
        </div>
      </div>
      <div className="space-y-6">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full bg-prompt-card-1 rounded-2xl p-5 shadow-lg border flex items-end justify-stretch ml-auto"
        >
          <div className="flex items-center justify-between gap-5 w-full">
            <div className="flex-1 flex items-start justify-between gap-2 flex-col bg-[#FF991F33] p-4 rounded-xl max-w-[180px]">
              <div className="bg-[#FF991F] p-2 rounded-full">
                <History />
              </div>
              <p className="text-white text-sm mt-1">Watch</p>
              <p className="text-slate-400 text-xs whitespace-normal">
                Lorem Ipsum dolor sit amet carriers for better pricing
              </p>
            </div>
            <div className="flex-1 flex items-start justify-between gap-2 flex-col bg-[#00875A66] p-4 rounded-xl max-w-[180px]">
              <div className="bg-[#00CF8A] p-2 rounded-full">
                <Waypoints />
              </div>
              <p className="text-white text-sm mt-1">Network</p>
              <p className="text-slate-400 text-xs whitespace-normal">
                Lorem Ipsum dolor sit amet carriers for better pricing
              </p>
            </div>
            <div className="flex-1 flex items-start justify-between gap-2 flex-col bg-[#5243AA66] p-4 rounded-xl max-w-[180px]">
              <div className="bg-[#6C59DA] p-2 rounded-full">
                <SearchCheck />
              </div>
              <p className="text-white text-sm mt-1">Search</p>
              <p className="text-slate-400 text-xs whitespace-normal">
                Lorem Ipsum dolor sit amet carriers for better pricing
              </p>
            </div>
          </div>
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

export default ActiveNode;
