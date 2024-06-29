import VideoPlayer from "@/components/containers/tv/videoplayer";

export default async function Info({ params }: any) {
  const id = params.id;

  return <VideoPlayer id={id} />;
}
