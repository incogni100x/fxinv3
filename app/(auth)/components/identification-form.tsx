"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "@/components/ui/file-uploader";
import { FormWrapper } from "./form-wrapper";
import FormButton from "@/components/ui/form-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IdentificationSchema } from "@/schemas/onboarding";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { FormError } from "@/components/ui/form-error";
import { updateDocumentIdentification } from "@/actions/on-boarding";

type Schema = z.infer<typeof IdentificationSchema>;

export function IdentificationForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const form = useForm<Schema>({
    resolver: zodResolver(IdentificationSchema),
    defaultValues: {
      images: [],
      document_type: "",
    },
  });

  async function onSubmit(values: Schema) {
    setLoading(true);
    const supabase = createSupabaseBrowser();
    try {
      // Authenticate user
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setError("Unauthorized");
        return;
      }

      const userId = data?.user?.id;
      const uploadedImageUrls: string[] = [];

      // Check for selected images
      if (!values.images || values.images.length === 0) {
        toast.error("At least one image is required.");
        return;
      }

      // Loop through the selected images and upload them
      for (const file of values.images) {
        const imageId = crypto.randomUUID();
        const timestamp = Date.now(); // Current timestamp for additional folder
        const uploadPath = `${userId}/${timestamp}-${imageId}/${file.name}`;
        const { data: uploadedImage, error: uploadError } =
          await supabase.storage
            .from("Identifications")
            .upload(uploadPath, file);

        if (uploadError) {
          toast.error(`Error uploading ${file.name}: ${uploadError.message}`);
          return;
        }

        // Retrieve the public URL for the uploaded image
        const { data: imageUrl } = supabase.storage
          .from("Identifications")
          .getPublicUrl(uploadedImage.path);

        if (imageUrl?.publicUrl) {
          uploadedImageUrls.push(imageUrl.publicUrl);
        } else {
          toast.error(`Failed to retrieve public URL for ${file.name}`);
          return;
        }
      }

      // Prepare payload
      const idData = {
        document_type: values.document_type,
        images: uploadedImageUrls,
      };

      // Update document identification
      const response = await updateDocumentIdentification(idData, 3);

      // Handle response
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Identification documents updated successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Oops, something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper
      Label="Verify Your Identity"
      description="Submit clear images of your ID to confirm your identity. "
      currentStep="3"
      lastStep="4"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <FormError message={error} />
          <FormField
            control={form.control}
            name="document_type"
            render={({ field }) => (
              <FormItem>
                <Label>Document Type</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Document Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="identification_card">
                      Identification Card
                    </SelectItem>
                    <SelectItem value="voter_card">
                      Voter&apos;s Card
                    </SelectItem>

                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers_license">
                      Drivers License
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      className="bg-muted"
                      onValueChange={field.onChange}
                      maxFileCount={4}
                      maxSize={4 * 1024 * 1024}
                      // progresses={progresses}
                      // pass the onUpload function here for direct upload
                      // onUpload={uploadFiles}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormButton
            isPending={loading}
            className="w-full"
            size={"lg"}
            title="Continue"
          />
        </form>
      </Form>
    </FormWrapper>
  );
}
