"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";

export function CameraDialog({
  onImageCaptured,
  disabled,
}: {
  onImageCaptured: (imageBase64: string) => void;
  disabled: boolean;
}): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const openDialog = async () => {
    setIsDialogOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const closeDialog = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsDialogOpen(false);
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        onImageCaptured(dataUrl); // Send the base64 string back to the parent component
        closeDialog();
      }
    }
  };

  useEffect(() => {
    if (!isDialogOpen && videoRef.current && videoRef.current.srcObject) {
      closeDialog();
    }
  }, [isDialogOpen]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => (open ? openDialog() : closeDialog())}
    >
      <DialogTrigger asChild>
        <Button className="w-full" disabled={disabled}>
          <Camera className="mr-2 h-4 w-4" />
          Take Picture
        </Button>
      </DialogTrigger>
      <DialogContent
        className="border-gray-700 bg-[#1F2937] text-gray-100 sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Take a Picture</DialogTitle>
          <DialogDescription>
            Capture an image using your camera.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <video ref={videoRef} autoPlay style={{ width: "100%" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        <DialogFooter className="sm:justify-between">
          <Button onClick={captureImage}>Capture</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="text-gray-100">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
