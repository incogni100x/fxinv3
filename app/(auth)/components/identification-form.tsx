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

const schema = z.object({
  document_type: z.string().min(1, { message: "Document type is required" }),
  images: z
    .array(z.instanceof(File))
    .min(2, { message: "Minimum of 2 images are required" })
    .max(10, { message: "Maximum of 10 images are allowed" }),
});

type Schema = z.infer<typeof schema>;

export function IdentificationForm() {
  const [loading, setLoading] = React.useState(false);
  //   const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
  //     "imageUploader",
  //     { defaultUploadedFiles: [] }
  //   )
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
    },
  });

  function onSubmit(values: Schema) {
    console.log(values);

    // setLoading(true)

    // toast.promise(onUpload(input.images), {
    //   loading: "Uploading images...",
    //   success: () => {
    //     form.reset()
    //     setLoading(false)
    //     return "Images uploaded"
    //   },
    //   error: (err) => {
    //     setLoading(false)
    //     return getErrorMessage(err)
    //   },
    // })
  }

  return (
    <FormWrapper
      Label="Verify Your Identity"
      description="Submit clear images of your ID to confirm your identity. "
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="document_type"
            render={({ field }) => (
              <FormItem>
                <Label>Document Type</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  //   disabled={isPending}
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
                      // disabled={isUploading}
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
