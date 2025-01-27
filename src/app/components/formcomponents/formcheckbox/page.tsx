"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Formcheckbox = ({ control, name, label, items }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
          </div>
          {items.map((item) => (
            <FormField
              key={item.id} 
              control={control}
              name={name} 
              render={({ field }) => {
                const valueArray = Array.isArray(field.value)
                  ? field.value
                  : []; 

                return (
                  <FormItem
                    key={item.id} 
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={valueArray.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...valueArray, item.id])
                            : field.onChange(
                                valueArray.filter((value) => value !== item.id)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Formcheckbox;
