import Spinner from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center rounded-md bg-blue-50">
      <Spinner className="text-blue-700" width={50} height={50} />
    </div>
  );
}
