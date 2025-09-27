"use client";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

export default function TextField({ form, name, label, ...props }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
