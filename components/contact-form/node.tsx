"use client";

import { motion } from "framer-motion";
import { Loader, Mail, Minimize2 } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { useEffect, useState } from "react";
import { Carrier } from "../secondaryNode/node";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import ContactForm, { ContactFormType } from "./form";

interface ActiveNodeProps {
  data: {
    message?: string;
    IsSelected?: boolean;
    handleCloseNode: (nodeId: string) => void;
  };
}

function ContactFormNode({ data }: ActiveNodeProps) {
  const { handleCloseNode } = data;
  let carrierData: Carrier = {};
  try {
    carrierData = JSON.parse(data.message || "");
  } catch (error) {
    console.log(error);
    carrierData = {};
  }

  const { toast } = useToast();
  const [loading, setLoading] = useState<string | boolean>("schema");
  const [contactForm, setContactForm] = useState<ContactFormType>();

  const fetchFormFields = async () => {
    setLoading("schema");
    try {
      const response = await (
        await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/v1/contact/schema?company=${new URL(
            carrierData.url || ""
          ).host.replace("www.", "")}`
        )
      ).json();

      if (!response.success) throw new Error(response.message);

      setContactForm(response.data);
    } catch (error: unknown) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormFields();
  }, []);

  // useEffect(() => {
  //   console.log({contactForm});
  // }, [contactForm]);

  const handleFormSubmit = async (values: {
    [key: string]: string | boolean;
  }) => {
    setLoading("submit");
    try {
      const response = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact-company`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              company: new URL(carrierData.url || "").host.replace("www.", ""),
              inputs: values,
            }),
          }
        )
      ).json();
      console.log(response);

      if (!response.success) throw new Error(response.message);

      toast({
        description: response.message,
      });

      handleCloseNode("contactForm");
    } catch (error: unknown) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <div className="rounded-full p-2 bg-rating-node-gradient">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <p className="text-white font-semibold">
              Contact {carrierData.name}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => handleCloseNode("contactForm")}
            className="size-12"
          >
            <Minimize2 className="text-slate-200 cursor-pointer !size-6" />
          </Button>
        </div>
        <div className="space-y-6">
          <div className="w-[720px] h-[620px]">
            {loading === "schema" || !contactForm ? (
              <div className="size-full flex justify-center items-center">
                <Loader className="size-10 animate-spin text-primary" />
              </div>
            ) : (
              <ScrollArea className="size-full">
                <ContactForm
                  {...contactForm}
                  loading={loading === "submit"}
                  handleFormSubmit={handleFormSubmit}
                />
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactFormNode;
