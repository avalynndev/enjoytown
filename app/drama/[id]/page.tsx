import DetailsContainer from '@/components/containers/drama/details';
import { MOVIES } from 'avalynndev-extensions';

export default async function DramaInfo({ params }: any) {
  const id = decodeURIComponent(params.id);
  const dramacool = new MOVIES.DramaCool();
  const info = await dramacool.fetchMediaInfo(id);
  if (!info.episodes || info.episodes.length == 0) {
    // console.log('No Data');
  }
  return <div key={id}>{info && <DetailsContainer data={info} id={id} />}</div>;
}
