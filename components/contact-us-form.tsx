"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useTransition } from "react";
import { FormError } from "@/components/ui/form-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/phone-input";

import { FormWrapper } from "@/app/(auth)/components/form-wrapper";
import { ContactUsSchema } from "@/schemas/auth";
import { Textarea } from "@/components/ui/textarea";
import FormButton from "@/components/ui/form-button";
import { toast } from "sonner";
import { contactUs } from "@/actions/transactions";

export function ContactUs() {
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      name: "",
      phoneNo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactUsSchema>) => {
    startTransition(() => {
      contactUs(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          } else {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => setError("Oops! Something went wrong!"));
    });
  };

  return (
    <FormWrapper
      Label=" Get in Touch with Us"
      description="   We&#39;d love to hear from you! Fill out the form below and
                we&#39;ll get back to you as soon as possible"
      className="max-w-lg"
    >
      <FormError message={error} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Your Name</Label>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Your Email</Label>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Phone number</Label>
                  <FormControl>
                    {/* <Input
                            disabled={isPending}
                            placeholder="081234567890"
                            {...field}
                            // onChange={(event) =>
                            //   field.onChange(console.log(event.target.value))
                            // }
                            type="number"
                          /> */}

                    <PhoneInput
                      {...field}
                      defaultCountry="NG"
                      onChange={field.onChange}
                      disabled={isPending}
                      // placeholder="Enter a phone number"
                      international
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <Label>Your Message</Label>
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="resize-none h-48 p-6"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton
            title="Send message"
            className="w-full"
            isPending={isPending}
            type="submit"
          />
        </form>
      </Form>
    </FormWrapper>
  );
}
