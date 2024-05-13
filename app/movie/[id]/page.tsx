import { getInfoURL } from "@/config/url";
import DetailsContainer from "@/components/movie/containers/details";
import VideoPlayer from "@/components/movie/containers/videoplayer";

export default async function Info({ params }:any) {
  const id = params.id;
  const data = await get_movie_info(id);

  return (
    <main
    >
      <DetailsContainer data={data}/>
      <VideoPlayer id={id}/>
    </main>
  );
}

const get_movie_info = async (id:any) => {
  const res = await fetch(getInfoURL(id), { next: { revalidate: 21620 } });
  const data = await res.json();
  return data;
};
