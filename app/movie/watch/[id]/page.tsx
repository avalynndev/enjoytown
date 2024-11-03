import VideoPlayer from "@/components/containers/movie/videoplayer";

export default async function Info({ params }: any) {
  const id = (await params).id;

  return <VideoPlayer id={id} />;
}
