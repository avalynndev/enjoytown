import DetailsContainer from "@/components/containers/kdrama/details";
import { getDramaInfo } from "@/fetch";

export default async function DramaInfo({ params }: any) {
  const id = decodeURIComponent(params.id);
  const info = await getDramaInfo(id);
  if (!info.episodes || info.episodes.length == 0) {
    console.log("No Data");
  }
  return <div key={id}>{info && <DetailsContainer data={info} />}</div>;
}
