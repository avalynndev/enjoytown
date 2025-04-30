import DetailsContainer from '@/components/containers/tv/details';
import { tmdb } from '@/lib/tmdb';

export default async function MovieInfo({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  try {
    const data = await tmdb.tv.details(Number(id), 'en-US');
    return (
      <div className="mx-auto max-w-6xl pb-8 md:pt-4">
        <DetailsContainer data={data} id={id} />
      </div>
    );
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    return <div>Error: {errorMessage}</div>;
  }
}
