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
  {
    component: Formselect,
    name: "branch",
    label: "branch",
    placeholder: "select branch",
    options: [
      { name: "btech", label: "btech" },
      { name: "mtech", label: "mtech" },
    ],
  },
  {
    component: Formtextarea,
    name: "address",
    label: "address",
    placeholder: "Enter address here",
  },
  {
    component: Formradiogroup,
    name: "gender",
    placeholder: "gender",
    label: "Select Gender",
    options: [
      { name: "Male", value: "male", label: "male" },
      { name: "female", value: "female", label: "female" },
    ],
  },
  {
    component: Formcheckbox,
    name: "hobbies",
    label: "Select your hobbies",
    items: [
      { id: "chess", label: "chess" },
      { id: "cricket", label: "cricket" },
    ],
  },
  {
    component: Formdate,
    label: "Select date of birth",
    name: "dob",
  },
  {
    component: Formswitch,
    name: "terms",
    label: "Accept terms and conditions",
  },
  //some error because we have to pass the form itself to the component, figure it out tomorrow
  {
    component: Formcombobox,
    list: [
      { label: "English", value: "en" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "Portuguese", value: "pt" },
      { label: "Russian", value: "ru" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Chinese", value: "zh" },
    ],
    label: "Select language",
    name: "language",
    searchErr: "No language found",
  },
];

const Register = () => {
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

export default Register;
