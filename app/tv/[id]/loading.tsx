import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
        <div className="space-y-8 pb-16">
        <div className="space-y-8 p-2">
            <Skeleton className="h-96 w-full" />
            <div className="flex flex-col md:flex-row gap-4">
            <div className="mx-auto my-8 max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0 ">
                <main className="flex flex-col gap-4 md:flex-row">
                <aside className="-mt-24 w-full space-y-2  md:-mt-32 md:w-1/3">
                    <Skeleton className="h-96 w-[300px] rounded-lg" />
                </aside>
                </main>
            </div>
            <div className="w-full md:w-2/3 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-2/3" />
                <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-8" />
                </div>
                <Skeleton className="h-4 w-full" />
            </div>
            </div>
            <Skeleton className="h-96 w-full " />
        </div>
        </div>
    </div>
  );
}
