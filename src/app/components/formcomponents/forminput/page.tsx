import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Forminput = ({ control, name, label, rules, ...props }) => {
  return (
    <>
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    </>
  );
};

export default Forminput;