"use client";

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
import { useForm } from "react-hook-form";
import Forminput from "../formcomponents/forminput/page";
import Formselect from "../formcomponents/formselect/page";
import Formtextarea from "../formcomponents/formtextarea/page";
import Formradiogroup from "../formcomponents/formradiogroup/page";
import Formcheckbox from "../formcomponents/formcheckbox/page";
import Formdate from "../formcomponents/formdate/page";
import Formswitch from "../formcomponents/formswitch/page";
import Formcombobox from "../formcomponents/formcombobox/page";

const fields = [
  {
    component: Forminput,
    name: "username",
    label: "username",
    rules: { required: { value: true, message: "username is required" } },
  },
  {
    component: Forminput,
    name: "password",
    label: "password",
    rules: { required: { value: true, message: "password is required" } },
    type: "password",
  },
  
  //some error because we have to pass the form itself to the component, figure it out tomorrow
];

const Login = () => {
  const form = useForm({
    defaultValues: {
      username: "", // Initialize with an empty string or any default value
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* <Forminput
          name="Username"
          label="username"
          rules={{ required: { value: true, message: "password is required" } }}
          control={form.control}
        />
        <Forminput
          name="password"
          label="password"
          rules={{ required: { value: true, message: "password is required" } }}
          control={form.control}
          type="password"
        /> */}
        {fields.map(({ component: Component, ...x }) => (
          <Component key={x.name} control={form.control} {...x} />
        ))}
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Login;
