"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { z } from "zod";

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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { error } from "console";
import { X } from "lucide-react";

const fields = [
  {
    component: Forminput,
    name: "name",
    label: "Invoice ID",
    rules: { required: { value: true, message: "username is required" } },
  },

  {
    component: Formcombobox,
    list: [
      { label: "Paid", value: "Paid" },
      { label: "Pending", value: "Pending" },
      { label: "Unpaid", value: "Unpaid" },
    ],
    label: "Select status",
    name: "status",
    searchErr: "No such status",
  },
  {
    component: Formcombobox,
    list: [
      { label: "Credit Card", value: "Credit" },
      { label: "PayPal", value: "PayPal" },
      { label: "Bank Transfer", value: "Bank Transfer" },
    ],
    label: "Select payment method",
    name: "method",
    searchErr: "No such method",
  },
  {
    component: Forminput,
    name: "amount",
    label: "Amount",
    rules: { required: { value: true, message: "password is required" } },
    // type: "password",
  },
  //some error because we have to pass the form itself to the component, figure it out tomorrow
];

const Productcrud = () => {
  const [invoices, setInvoices] = useState([]);

  const addData = async (data) => {
    console.log(data);
    try {
      // Fetch existing invoices to check if the id already exists
      const existingResponse = await fetch("http://localhost:3001/invoices");
      const existingInvoices = await existingResponse.json();
      const idExists = existingInvoices.some(
        (invoice) => invoice.id === data.name
      );

      if (idExists) {
        throw new Error("Invoice ID already exists");
      }

      const response = await fetch(`http://localhost:3001/invoices`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: data.name,
          paymentStatus: data.status,
          totalAmount: data.amount,
          paymentMethod: data.method,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json);
      }
      loader();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRow = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/invoices/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error);
    }
    loader();
  };

  const loader = async () => {
    const response = await fetch("http://localhost:3001/invoices");
    const json = await response.json();
    setInvoices(json);
    console.log(json);
  };

  useEffect(() => {
    loader();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      status: "",
      method: "",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    addData(data);
    console.log(data);
  };
  const onUpdate = (data) => {
    addData(data);
    console.log(data);
  };

  // const myDialog = (tag,function) => {

  //     <>
  //         <Form {...form}>
  //       <form
  //         onSubmit={form.handleSubmit(onSubmit)}
  //         className="w-2/3 space-y-6"
  //       >
  //         <Dialog>
  //           <DialogTrigger asChild>
  //             <Button variant="outline">Add</Button>
  //           </DialogTrigger>
  //           <DialogContent className="sm:max-w-[425px]">
  //             <DialogHeader>
  //               <DialogTitle>Add record</DialogTitle>
  //             </DialogHeader>
  //             {fields.map(({ component: Component, name, ...x }) => (
  //               <div className="grid gap-4 py-4" key={name}>
  //                 <div className="grid grid-cols-4 items-center gap-4">
  //                   <Component control={form.control} name={name} {...x} />
  //                 </div>
  //               </div>
  //             ))}
  //             <DialogFooter>
  //               <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
  //                 Save changes
  //               </Button>
  //             </DialogFooter>
  //           </DialogContent>
  //         </Dialog>
  //       </form>
  //     </Form>
  //     </>
  // };

  return (
    <>
      <div className="flex flex-col m-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add record</DialogTitle>
                </DialogHeader>
                {fields.map(({ component: Component, name, ...x }) => (
                  <div className="grid gap-4 py-4" key={name}>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Component control={form.control} name={name} {...x} />
                    </div>
                  </div>
                ))}
                <DialogFooter>
                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
        <div className="">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                  {/*<TableCell>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onUpdate)}
                        className="w-2/3 space-y-6"
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              onClick={() => console.log("before showing form")}
                            >
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update record</DialogTitle>
                            </DialogHeader>

                            {/* Dynamically rendering form fields */}
                            {/* {fields.map(
                              ({ component: Component, name, ...x }) => (
                                <div className="grid gap-4 py-4" key={name}>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Component
                                      control={form.control}
                                      name={name}
                                      {...x}
                                    />
                                  </div>
                                </div>
                              )
                            )} */}

                            {/* Additional fields for invoice data */}
                            {/* <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Forminput
                                  control={form.control}
                                  name="id"
                                  defaultValue={invoice.id}
                                />
                                <Formcombobox
                                  control={form.control}
                                  name="paymentStatus"
                                  defaultValue={invoice.paymentStatus}
                                />
                                <Formcombobox
                                  control={form.control}
                                  name="paymentMethod"
                                  defaultValue={invoice.paymentMethod}
                                />
                                <Forminput
                                  control={form.control}
                                  name="totalAmount"
                                  defaultValue={invoice.totalAmount}
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button
                                type="submit"
                    //             onClick={form.handleSubmit(onSubmit)}
                    //           >
                    //             Save changes
                    //           </Button>
                    //         </DialogFooter>
                    //       </DialogContent>
                    //     </Dialog>
                    //   </form>
                    // </Form>
                  {/* </TableCell> */}

                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => deleteRow(invoice.id)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Productcrud;
