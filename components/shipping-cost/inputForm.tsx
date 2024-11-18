"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, PlusCircle, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import COUNTRIES_DATA from "@/data/countries-states.json";
import { ShippingFormSchema } from "./node";
import { motion } from "framer-motion";

type Country = {
  iso2: string;
  name: string;
  states: State[];
};

type State = {
  state_code: string;
  name: string;
};

const formSchema = z.object({
  from_address: z.object({
    // companyName: z.string().min(1, "Company name is required"),
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    // addressLine2: z.string().optional(),
    cityLocality: z.string().min(1, "City is required"),
    stateProvince: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    countryCode: z.string().min(2, "Country code is required"),
    addressResidentialIndicator: z.enum(["yes", "no"]),
  }),
  to_address: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    cityLocality: z.string().min(1, "City is required"),
    stateProvince: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    countryCode: z.string().min(2, "Country code is required"),
    addressResidentialIndicator: z.enum(["yes", "no"]),
  }),
  packages: z
    .array(
      z.object({
        weight: z.object({
          value: z.number().min(1, "Weight is required"),
          unit: z.enum(["ounce", "pound", "gram", "kilogram"]),
        }),
        dimensions: z.object({
          length: z.number().min(1, "Length is required"),
          width: z.number().min(1, "Width is required"),
          height: z.number().min(1, "Height is required"),
          unit: z.enum(["inch", "centimeter"]),
        }),
      })
    )
    .min(1, "At least one package is required"),
});

export default function ShippingForm({
  loading,
  shippingData,
  handleFetchShippingCost,
}: {
  loading: boolean;
  shippingData: ShippingFormSchema;
  handleFetchShippingCost: (shippingData: ShippingFormSchema) => void;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [fromStates, setFromStates] = useState<State[]>([]);
  const [toStates, setToStates] = useState<State[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: shippingData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "packages",
  });

  useEffect(() => {
    setCountries(
      COUNTRIES_DATA.map((country) => ({
        ...country,
        states: country.states.filter((state) => state.state_code !== null),
      }))
    );
  }, []);

  useEffect(() => {
    const fromCountry = form.watch("from_address.countryCode");
    const toCountry = form.watch("to_address.countryCode");

    if (fromCountry) {
      const country = countries.find((c) => c.iso2 === fromCountry);
      setFromStates(country ? country.states : []);
    }

    if (toCountry) {
      const country = countries.find((c) => c.iso2 === toCountry);
      setToStates(country ? country.states : []);
    }
  }, [
    form.watch("from_address.countryCode"),
    form.watch("to_address.countryCode"),
    countries,
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleFetchShippingCost(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full bg-prompt-card-1 rounded-2xl p-5 shadow-lg border mr-auto space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>From Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* <FormField
                  control={form.control}
                  name="from_address.companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                  <FormField
                    control={form.control}
                    name="from_address.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="from_address.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="from_address.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                  control={form.control}
                  name="from_address.addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                  <FormField
                    control={form.control}
                    name="from_address.cityLocality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="from_address.countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem
                                key={country.iso2}
                                value={country.iso2}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="from_address.stateProvince"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fromStates.map((state) => (
                              <SelectItem
                                key={state.state_code}
                                value={state.state_code}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="from_address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="from_address.addressResidentialIndicator"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Residential Address
                        </FormLabel>
                        <FormDescription>
                          Is this a residential address?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "yes"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "yes" : "no")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>To Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="to_address.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to_address.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to_address.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to_address.cityLocality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to_address.countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem
                                key={country.iso2}
                                value={country.iso2}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to_address.stateProvince"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {toStates.map((state) => (
                              <SelectItem
                                key={state.state_code}
                                value={state.state_code}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to_address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="to_address.addressResidentialIndicator"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Residential Address
                        </FormLabel>
                        <FormDescription>
                          Is this a residential address?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "yes"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "yes" : "no")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent>
              {fields.map((field, index) => (
                <div key={field.id} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">
                      Package {index + 1}
                    </h4>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove package</span>
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`packages.${index}.weight.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`packages.${index}.weight.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select weight unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ounce">Ounce</SelectItem>
                              <SelectItem value="pound">Pound</SelectItem>
                              <SelectItem value="gram">Gram</SelectItem>
                              <SelectItem value="kilogram">Kilogram</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`packages.${index}.dimensions.length`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`packages.${index}.dimensions.width`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`packages.${index}.dimensions.height`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`packages.${index}.dimensions.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimension Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select dimension unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="inch">Inch</SelectItem>
                              <SelectItem value="centimeter">
                                Centimeter
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({
                    weight: { value: 0, unit: "ounce" },
                    dimensions: {
                      length: 0,
                      width: 0,
                      height: 0,
                      unit: "inch",
                    },
                  })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <div className="flex">
          <Button
            type="submit"
            className="ml-auto bg-prompt-card-icon hover:bg-[#F5A623]/90 text-white rounded-lg px-6"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
