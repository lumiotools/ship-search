import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ContactFormField, { ContactFormFieldType } from "./formField";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface ContactFormType {
  title: string;
  description?: string;
  fields: ContactFormFieldType[];
  buttonText: string;
}

interface ContactFormPropType extends ContactFormType {
  loading: boolean;
  handleFormSubmit: (values: { [key: string]: string | boolean | string[] }) => void;
}

const ContactForm = ({
  title,
  description,
  fields,
  buttonText,
  loading,
  handleFormSubmit,
}: ContactFormPropType) => {
  const { toast } = useToast();
  const [values, setValues] = useState<{ [key: string]: string | boolean | string[] }>(
    Object.fromEntries(fields.map((field) => [field.title, ""]))
  );

  const isFormFilled = Object.values(values)
    .map((value, i) =>
      fields[i].required
        ? typeof value === "string"
          ? value.trim().length >= 3
          : value
        : true
    )
    .every(Boolean);

  const handleFormValuesVerify = (values: {
    [key: string]: string | boolean | string[];
  }) => {
    const isFilled = Object.values(values)
      .map((value, i) =>
        fields[i].required
          ? typeof value === "string"
            ? value.trim().length >= 3
            : value
          : true
      )
      .every(Boolean);

    if (!isFilled) {
      toast({
        description: "Please fill all the required fields",
        variant: "destructive",
      });

      return;
    } else {
      handleFormSubmit(values);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFormValuesVerify(values);
    }
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <ContactFormField
            key={index}
            {...field}
            value={values[field.title]}
            onChange={(value) => setValues({ ...values, [field.title]: value })}
            onKeyDown={handleKeyDown}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button
          className="min-w-32 bg-prompt-card-icon hover:bg-[#F5A623]/90 text-white rounded-lg px-6 ml-auto"
          onClick={() => handleFormValuesVerify(values)}
          disabled={!isFormFilled || loading}
        >
          {loading ? <Loader className="animate-spin" /> : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
