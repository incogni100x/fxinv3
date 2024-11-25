"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Camera, Upload, X } from "lucide-react";
import { CameraDialog } from "./camera-dialog";
import { FormWrapper } from "./form-wrapper";

const formSchema = z.object({
  image: z.string().min(1, { message: "A verification photo is required" }),
});

export default function UserIdentityVerification() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically send the image to your server for verification
  };

  const handleCapture = (imageDataUrl: string) => {
    form.setValue("image", imageDataUrl, { shouldValidate: true });
  };
  const image = form.watch("image");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        form.setValue("image", result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    form.setValue("image", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormWrapper
      Label="Identity Verification"
      description="Please provide a clear photo of yourself for verification purposes."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col items-center space-y-4">
                    {field.value ? (
                      <div className="relative">
                        <img
                          src={field.value}
                          alt="User verification"
                          className="w-full max-w-xs max-h-64 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={handleRemove}
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 w-full">
                        <CameraDialog
                          onImageCaptured={handleCapture}
                          disabled={form.formState.isSubmitting}
                          //   onClose={() => setShowCamera(false)}
                        />
                        <div className="flex items-center">
                          <hr className="flex-grow border-t" />
                          <span className="px-3 text-sm text-gray-500">or</span>
                          <hr className="flex-grow border-t" />
                        </div>
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="w-full text-black"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          ref={fileInputRef}
                          className="hidden"
                          aria-label="Upload image"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {image && (
            <Button type="submit" className="w-full">
              Verify Identity
            </Button>
          )}
        </form>
      </Form>
    </FormWrapper>
  );
}
