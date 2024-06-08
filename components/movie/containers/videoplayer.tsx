"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VideoPlayer({ id }:any) {
  return (
    <div className="pb-8">
      <Tabs defaultValue="vidsrc">
        <div className="flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="vidsrc">VidSrc</TabsTrigger>
            <TabsTrigger value="vidsrcvip">VidSrc.Vip</TabsTrigger>
            <TabsTrigger value="autoembed">AutoEmbed</TabsTrigger>
            <TabsTrigger value="vidsrcin">Vid.In</TabsTrigger>
            <TabsTrigger value="superembed">SuperEmbed</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="vidsrc">
          <iframe
            src={`https://vidsrc.icu/embed/movie/${id}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidsrcvip">
          <iframe
            src={`https://vidsrc.vip/embed/movie/${id}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="autoembed">
          <iframe
            src={`https://player.autoembed.cc/embed/movie/${id}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidsrcin">
          <iframe
            src={`https://vidsrc.in/embed/movie/${id}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="superembed">
          <iframe
            src={`https://multiembed.mov/?video_id=${id}&tmdb=1`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
      </Tabs>
    </div>
  );
}
