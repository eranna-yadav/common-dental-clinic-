import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <div className="bg-navy py-20"><Container><Skeleton className="h-4 w-40 bg-white/10" /><Skeleton className="mt-6 h-12 w-3/4 max-w-2xl bg-white/10" /><Skeleton className="mt-4 h-5 w-2/3 max-w-xl bg-white/10" /></Container></div>
      <Container className="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
      </Container>
    </div>
  );
}
