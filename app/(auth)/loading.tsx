import Spinner from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center rounded-md bg-[#111827]">
      <Spinner className="text-primary" width={50} height={50} />
    </div>
  );
}
