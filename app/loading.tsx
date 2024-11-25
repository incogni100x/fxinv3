import Spinner from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <Spinner className="text-primary" width={50} height={50} />
    </div>
  );
}
