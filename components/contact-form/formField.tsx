import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

interface ContactFormFieldOptionsType {
  label: string;
  value: string;
}

export interface ContactFormFieldType {
  id: number;
  title: string;
  type: string;
  options?: ContactFormFieldOptionsType[];
  required: boolean;
}

interface ContactFormFieldPropType extends ContactFormFieldType {
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ContactFormField = ({
  title,
  required,
  type,
  options,
  value,
  onChange,
}: ContactFormFieldPropType) => {
  return (
    <div className="space-y-2">
      {type !== "checkbox" && (
        <Label>
          {title}
          {required ? <span className="text-red-500 pl-0.5">*</span> : <></>}
        </Label>
      )}
      {type === "text" && (
        <Input
          className="w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl py-5 text-white placeholder:text-[#808080]"
          value={value.toString()}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === "email" && (
        <Input
          className="w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl py-5 text-white placeholder:text-[#808080]"
          type="email"
          value={value.toString()}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === "textarea" && (
        <Textarea
          rows={3}
          className="w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl py-5 text-white placeholder:text-[#808080]"
          value={value.toString()}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {type === "dropdown" && (
        <Select>
          <SelectTrigger className="w-full bg-prompt-card-input border-prompt-card-input-border rounded-xl py-5 text-white placeholder:text-[#808080]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {options?.map(({ label, value }) => (
              <SelectItem value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {type === "checkbox" && (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
          />
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      )}
    </div>
  );
};

export default ContactFormField;
