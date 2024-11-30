import Spinner from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <Spinner className="text-primary" width={50} height={50} />
    </div>
  );
}
