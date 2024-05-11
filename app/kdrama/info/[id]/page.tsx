import DetailsContainer from "@/components/kdrama/containers/details";
import EpisodeContainer from "@/components/kdrama/containers/episode";
import { getDramaInfo } from "@/lib/fetch";

export default async function DramaInfo({ params }: any) {
  const id = decodeURIComponent(params.id);
  const info = await getDramaInfo(id);
  if (!info.episodes || info.episodes.length == 0) {
    console.log("xxx");
  }
  return (
    <div key={id}>
      {info && (
        <>
          <DetailsContainer data={info} />
          <EpisodeContainer data={info.episodes} id={id} />
        </>
      )}
    </div>
  );
}
