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

import { Upload, X } from "lucide-react";
import { CameraDialog } from "./camera-dialog";
import { FormWrapper } from "./form-wrapper";
import { createSupabaseBrowser } from "@/lib/supabase/client";

import { updateSelfieOnboarding } from "@/actions/on-boarding";
import { toast } from "sonner";
import Image from "next/image";
import { FormError } from "@/components/ui/form-error";

const formSchema = z.object({
  image: z.string().min(1, { message: "A verification photo is required" }),
});

export default function UserIdentityVerification() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      form.setValue("image", result, { shouldValidate: true });
    };
    reader.onerror = () => {
      toast.error("Failed to read the file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleCapture = (imageDataUrl: string) => {
    form.setValue("image", imageDataUrl, { shouldValidate: true });
  };

  const handleRemove = () => {
    form.setValue("image", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const supabase = createSupabaseBrowser();
    try {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setError("Unauthorized");
        toast.error("You must be logged in to verify your identity.");
        return;
      }

      const userId = data.user.id;
      const imageId = crypto.randomUUID();
      const timestamp = Date.now(); // Current timestamp for additional folder
      const uploadPath = `${userId}/${timestamp}-${imageId}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Identifications")
        .upload(uploadPath, new Blob([values.image], { type: "image/jpeg" }));

      if (uploadError) {
        toast.error(`Image upload failed: ${uploadError.message}`);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("Identifications")
        .getPublicUrl(uploadData.path);

      if (!publicUrlData?.publicUrl) {
        toast.error("Failed to retrieve the image URL.");
        return;
      }

      // Assume updateDocumentIdentification is a provided API function
      const response = await updateSelfieOnboarding(publicUrlData.publicUrl, 4);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Identity verified successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const image = form.watch("image");

  return (
    <FormWrapper
      Label="Identity Verification"
      description="Please provide a clear photo of yourself for verification purposes."
      currentStep="4"
      lastStep="4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormError message={error} />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col items-center space-y-4">
                    {field.value ? (
                      <div className="relative">
                        <Image
                          width={300}
                          height={300}
                          src={field.value}
                          alt="User verification"
                          className="w-full max-w-xs max-h-64 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          disabled={loading}
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
                          disabled={loading}
                        />
                        <div className="flex items-center">
                          <hr className="flex-grow border-t" />
                          <span className="px-3 text-sm text-gray-400">or</span>
                          <hr className="flex-grow border-t" />
                        </div>
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="w-full border-gray-700 bg-[#111827] text-gray-100 hover:bg-gray-700"
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Identity"}
            </Button>
          )}
        </form>
      </Form>
    </FormWrapper>
  );
}
