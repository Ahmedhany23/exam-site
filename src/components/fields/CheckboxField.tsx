"use client";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/src/components/ui/form";
import { Checkbox } from "@/src/components/ui/checkbox";

export default function CheckboxField({ form, name, label }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
